/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import classNames from 'classnames'
import io from 'socket.io-client'
import { withRouter } from 'react-router'

/* */
import styles from './WebStreamWrapper.scss'

const DetectRTC = require('detectrtc')

/*
    학생과 튜터 webRTC 연결이 맺어지는 과정
     1. 첫번째 유저가 handleClickButton => getUserMedia 함수 실행 (isSuccessGetMedia: true) => 카메라 On
     2. 두번째 유저가 들어오면 isPossibleJoin: true,
        createPeerConnection() => isConnectionSuccess: true
        createOffer() => socket 서버를 통한 SDP 연결

 */

@withRouter
class WebStreamWrapper extends React.Component {

    constructor(props) {
        super(props)
        this._refs = {}
        this.state = {
            isSuccessGetMedia: false,
            isPeerConnect: false,
            isConnectionSuccess : false,
            isErrorGetMedia: false,
            isPossibleJoin: false,
            stopVideo: true,
            stopAudio: true,
            token: '',
            href: '#',
        }
    }

    componentDidMount() {
        this.initValue()
        this.initSocket()
    }

    initValue() {
        this.hasWebcam = DetectRTC.hasWebcam
        this.hasMic = DetectRTC.hasMicrophone
        this.localStream = null
        this.socket = io('https://external.cocotutor.ml/stream', { secure: true })
        this.userId = Math.round(Math.random() * 999999) + 999999;
        this.roomId = this.props.match.params.classId
        this.remoteUserId = null
        this.localStream = null
        this.localSmallStream = null
        this.streams = []
        this.peer = null; // offer or answer peer
        this.peers = []
        this.iceServers = {
            'iceServers': [
                {'url': 'stun:stun.l.google.com:19302'},
                {'url': 'stun:stun1.l.google.com:19302'},
                {'url': 'stun:stun2.l.google.com:19302'},
                {
                    'url': 'turn:107.150.19.220:3478',
                    'credential': 'turnserver',
                    'username': 'subrosa'
                }]
        };
        window.navigator.getUserMedia = navigator.getUserMedia ||  navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia;
        this.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
        this.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;
        this.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
        this.peerConnectionOptions = {
            'optional': [{
                'DtlsSrtpKeyAgreement': 'true'
            }]
        };
        this.mediaConstraints = {
            'mandatory': {
                'OfferToReceiveAudio': true,
                'OfferToReceiveVideo': true
            }
        }
    }

    /** socket method **/
    initSocket() {
        console.log("this.scoket", this.socket)
        this.socket.emit('joinRoom', this.roomId, this.userId)
        this.socket.on('joinRoom', (roomId, userList) => {
            console.log('joinRoom', arguments)

            if (Object.keys(userList).length > 1) {
                this.setState({ isPossibleJoin: true })
            }
        })
        this.socket.on('leaveRoom', (userId) => {
            console.log('leaveRoom', arguments)
            this.onLeave(userId)
        });

        this.socket.on('message', (data) => {
            this.onmessage(data)
        });
    }

    /**
     * send
     * @param {object} msg data
     * socket.send는 message 이벤트를 보낸다.
     */
    send(data) {
        data.roomId = this.roomId;
        this.socket.send(data);
    }

    /**
     * onLeave
     * @param {string} userId
     */
    onLeave(userId) {
        if (this.remoteUserId === userId) {
            this.setState({ isConnectionSuccess : false })
            this.remoteUserId = null
        }
    }


    /**
     * onmessage
     * @param {object} msg data
     */
    onmessage(data) {
        console.log('onmessage', data)

        const msg = data
        const sdp = msg.sdp || null;

        if (!this.remoteUserId) {
            this.remoteUserId = data.userId;
        }

        // 접속자가 보내온 offer처리
        if (sdp) {
            if (sdp.type  == 'offer') {
                this.createPeerConnection();
                console.log('Adding local stream...');
                this.createAnswer(msg)

                // offer에 대한 응답 처리
            } else if (sdp.type == 'answer') {
                // answer signaling
                this.peer.setRemoteDescription(new RTCSessionDescription(msg.sdp));
            }

            // offer, answer cadidate처리
        } else if (msg.candidate) {
            const candidate = new RTCIceCandidate({
                sdpMid: msg.id,
                sdpMLineIndex: msg.label,
                candidate: msg.candidate
            });

            this.peer.addIceCandidate(candidate);
        } else {
            //console.log()
        }
    }

    /**
     * createAnswer
     * offer에 대한 응답 SDP를 생성 한다.
     * @param {object} msg offer가 보내온 signaling
     */
    createAnswer(msg) {
        console.log('createAnswer', arguments);

        this.peer.addStream(this.localStream);
        this.peer.setRemoteDescription(new RTCSessionDescription(msg.sdp), () => {
            this.peer.createAnswer((SDP) => {
                this.peer.setLocalDescription(SDP);
                console.log("Sending answer to peer.", SDP);
                this.send({
                    sender: this.userId,
                    to: 'all',
                    sdp: SDP
                });
            }, this.onSdpError, this.mediaConstraints);
        }, () => {
            console.error('setRemoteDescription', arguments);
        })
    }

    /**
     * createOffer
     * offer SDP를 생성 한다.
     */
    createOffer() {
        console.log('createOffer', arguments)

        this.peer.addStream(this.localStream) // addStream 제외시 recvonly로 SDP 생성됨
        this.peer.createOffer(SDP => {
            // url parameter codec=h264
            if (location.search.substr(1).match('h264')) {
                SDP.sdp = SDP.sdp.replace("100 101 107", "107 100 101") // for chrome < 57
                SDP.sdp = SDP.sdp.replace("96 98 100", "100 96 98") // for chrome 57 <
            }

            this.peer.setLocalDescription(SDP)
            console.log("Sending offer description", SDP)
            const sendPayload = {
                sender: this.userId,
                to: 'all',
                sdp: SDP,
            }
            this.send(sendPayload)
        }, this.onSdpError, this.mediaConstraints)
    }


    /**
     * createPeerConnection
     * offer, answer 공통 함수로 peer를 생성하고 관련 이벤트를 바인딩 한다.
     */
    createPeerConnection() {
        console.log('createPeerConnection', arguments)

        this.peer = new this.RTCPeerConnection(this.iceServers, this.peerConnectionOptions)
        console.log('new Peer', this.peer);

        this.peer.onicecandidate = (event) => {
            if (event.candidate) {
                const sendPayload = {
                    userId: this.userId,
                    to: 'all',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                }
                this.send(sendPayload)
            }
            else {
                console.info('Candidate denied', event.candidate);
            }
        }

        this.peer.onaddstream = (event) => {
            console.log("Adding remote strem", event);

            const id = 'remote-video'
            this.setState({ isConnectionSuccess : true })
            const el = this._refs[id]
            el.srcObject = event.stream
        };

        this.peer.onremovestream = (event) => {
            console.log("Removing remote stream", event)
        };

        this.peer.onnegotiationneeded = (event) => {
            console.log("onnegotiationneeded", event)
        };

        this.peer.onsignalingstatechange = (event) => {
            console.log("onsignalingstatechange", event)
        };

        this.peer.oniceconnectionstatechange = (event) => {
            console.log("oniceconnectionstatechange",
                'iceGatheringState: ' + this.peer.iceGatheringState,
                '/ iceConnectionState: ' + this.peer.iceConnectionState);
        }
    }

    @autobind
    handleClickButton(isOffer) {
        return () => {
            if (this.hasWebcam && this.hasMic) {
                window.navigator.getUserMedia({
                    audio: true,
                    video: {
                        mandatory: {
                            // 720p와 360p 해상도 최소 최대를 잡게되면 캡쳐 영역이 가깝게 잡히는 이슈가 있다.
                            // 1920 * 1080 | 1280 * 720 | 858 * 480 | 640 * 360 | 480 * 272 | 320 * 180
                            maxWidth: 1280,
                            maxHeight: 720,
                            minWidth: 1280,
                            minHeight: 720,
                            maxFrameRate: 24,
                            minFrameRate: 18,
                            maxAspectRatio: 1.778,
                            minAspectRatio: 1.777
                        },
                        optional: [
                            {googNoiseReduction: true}, // Likely removes the noise in the captured video stream at the expense of computational effort.
                            {facingMode: "user"}        // Select the front/user facing camera or the rear/environment facing camera if available (on Phone)
                        ]
                    },
                }, (stream) => {
                    this.localStream = stream
                    this.setState({isSuccessGetMedia: true})
                    const el = this._refs['local-video']
                    if (el) {
                        el.srcObject = this.localStream
                    }

                    if (isOffer) {
                        console.log("나는 오퍼다")
                        this.createPeerConnection()
                        this.createOffer()
                    }

                }, () => {
                    this.setState({isErrorGetMedia: true})
                })
            }
            else {
                window.alert("웹캠과 마이크가 필요합니다")
            }
        }
    }

    @autobind
    onSdpError() {
        console.log('onSdpError', arguments);
    }

    @autobind
    handleClickLink() {
        const link = location.href;
        if (window.clipboardData) {
            window.clipboardData.setData('text', link);
            alert('Copy to Clipboard successful.');
        }
        else {
            window.prompt("Copy to clipboard: Ctrl+C, Enter", link); // Copy to clipboard: Ctrl+C, Enter
        }
    }

    @autobind
    toggleVideo() {
        console.log('pauseVideo', arguments)
        const stopVideo = this.state.stopVideo
        this.setState({ stopVideo: !stopVideo })
        this.localStream.getVideoTracks()[0].enabled = !stopVideo
    }

    @autobind
    toggleAudio() {
        console.log('muteAudio', arguments)
        const stopAudio = this.state.stopAudio
        console.log("hihi", stopAudio)
        this.setState({ stopAudio: !stopAudio })
        this.localStream.getAudioTracks()[0].enabled = !stopAudio
    }

    red() {
        // DetectRTC.isWebRTCSupported
    }

    renderJoinComponent() {
        const isOffer = this.state.isPossibleJoin
        if (!this.state.isSuccessGetMedia) {
            return (
                <div className={styles.join}>
                    <div className={styles.camera} onClick={this.handleClickButton(isOffer)}>
                        <i className="fa fa-video-camera" />
                    </div>
                </div>
            )
        }
        return null
    }

    renderVideoIcon() {
        if (this.state.stopVideo) {
            return (
                <div className={classNames(styles.button, styles.mute)} onClick={this.toggleVideo}>
                    <i className="fa fa-eye-slash"/>
                </div>
            )
        }
        return (
            <div className={styles.button} onClick={this.toggleVideo}>
                <i className="fa fa-eye" />
            </div>
        )
    }

    renderMicIcon() {
        if (this.state.stopAudio) {
            return (
                <div className={classNames(styles.button, styles.mute)} onClick={this.toggleAudio}>
                    <i className="fa fa-microphone-slash"/>
                </div>
            )
        }
        return (
            <div className={styles.button} onClick={this.toggleAudio}>
                <i className="fa fa-microphone" />
            </div>
        )
    }

    render() {
        return (
            <div className={styles.wrapper}>
                {this.renderJoinComponent()}
                <section id="room-list" />
                <section ref={e => this._refs.videoWrapper = e} className={styles.videoWrapper}>
                    <div className={styles.optionWrapper}>
                        {
                            this.state.isSuccessGetMedia || this.state.isConnectionSuccess
                                ? (
                                    <div className={styles.buttons}>
                                        {this.renderVideoIcon()}
                                        {this.renderMicIcon()}
                                    </div>
                                )
                                : null
                        }
                    </div>
                    <video
                        ref={e => this._refs["local-video"] = e}
                        className={classNames(styles["local-video"], { [styles.isVisible]: !this.state.isSuccessGetMedia })}
                        muted="muted" autoPlay="true" title="720p" />
                    <video
                        ref={e => this._refs["remote-video"] = e}
                        className={classNames(styles["remote-video"], { [styles.isVisible]: !this.state.isConnectionSuccess  })}
                        autoPlay="true" />
                </section>
            </div>
        )
    }
}

WebStreamWrapper.propTypes = {

}

WebStreamWrapper.defaultProps = {

}

export default WebStreamWrapper
