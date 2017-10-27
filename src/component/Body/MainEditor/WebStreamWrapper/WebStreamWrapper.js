/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import classNames from 'classnames'
import io from 'socket.io-client'
import PropTypes from 'prop-types'

/* */
import styles from './WebStreamWrapper.scss'

class WebStreamWrapper extends React.Component {

    constructor() {
        super()
        this._refs = {}
        this.state = {
            isChatStart: false,
            isPeerConnect: false,
            isPossibleStream: false,
            token: '',
            href: '#',
        }
        this.initValue()
    }

    initValue() {
        this.localStream = null;
        this.socket = io();
        this.userId = Math.round(Math.random() * 999999) + 999999;
        this.roomId = null;
        this.remoteUserId = null;
        this.isOffer = null;
        this.localStream = null;
        this.localSmallStream = null;
        this.streams = [];
        this.peer = null; // offer or answer peer
        this.peers = [];
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
        navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
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

        this.socket.emit('joinRoom', this.roomId, this.userId);
        this.socket.on('joinRoom', (roomId, userList) => {
            if (Object.size(userList) > 1) {
                // onFoundUser();
            }
        })
    }

    @autobind
    handleClickButton() {
        navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 }}, (stream) => {
            this.localStream = stream;
            this.setState({ isChatStart: true })
            const el = this._refs['local-video-first']
            if (el) {
                console.log("el", el)
                el.srcObject = this.localStream
            }

            if (this.isOffer) {
                this.peer = this.createPeerConnection('first')
                this.createOffer('first', this.peer, this.localStream)
            }

            this.createSmallVideo()
        }, () => {
            console.error('Error getUserMedia')
        })
    }

    createSmallVideo() {
        navigator.getUserMedia({
            audio: true,
            video: {
                width: 160,
                height: 90
            }
        }, (stream) => {
            this.localSmallStream = stream
            this.setState({ isPeerConnect: true })
            const el = this._refs['local-video-second']
            el.srcObject = this.localSmallStream;
            var peer = this.createPeerConnection('second')
            this.createOffer('second', peer, this.localSmallStream)
        }, () => {
            console.error('Error getUserMedia');
        })
    }


    /**
     * createOffer
     * offer SDP를 생성 한다.
     */
    createOffer(sessionType, peer, stream) {
        console.log('createOffer', arguments);

        peer.addStream(stream); // addStream 제외시 recvonly로 SDP 생성됨
        peer.createOffer(SDP => {
            // url parameter codec=h264
            if (location.search.substr(1).match('h264')) {
                SDP.sdp = SDP.sdp.replace("100 101 107", "107 100 101") // for chrome < 57
                SDP.sdp = SDP.sdp.replace("96 98 100", "100 96 98") // for chrome 57 <
            }

            peer.setLocalDescription(SDP)
            console.log("Sending offer description", SDP)
            const sendPayload = {
                sender: this.userId,
                to: 'all',
                sessionType: sessionType,
                sdp: SDP,
            }
            send(sendPayload)
        }, this.onSdpError, this.mediaConstraints)
    }

    @autobind
    onSdpError() {
        console.log('onSdpError', arguments);
    }

    // onFoundUser() {
    //     $roomList.html([
    //         '<div class="room-info">',
    //         '<p>당신을 기다리고 있어요. 참여 하실래요?</p>',
    //         '<button id="join">Join</button>',
    //         '</div>'].join('\n')
    //     );
    //
    //     var $btnJoin = $('#join');
    //     $btnJoin.click(function() {
    //         isOffer = true;
    //         getUserMedia();
    //         $(this).attr('disabled', true);
    //     });
    //
    //     $joinWrap.slideUp(1000);
    //     $tokenWrap.slideUp(1000);
    // }


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

    /**
     * createPeerConnection
     * offer, answer 공통 함수로 peer를 생성하고 관련 이벤트를 바인딩 한다.
     */
    createPeerConnection(type) {
        console.log('createPeerConnection', arguments)

        var peer = {
            type: type,
            pc: null
        };

        peer.pc = new this.RTCPeerConnection(this.iceServers, this.peerConnectionOptions);
        console.log('new Peer', peer);

        peer.pc.onicecandidate = (event) => {
            if (event.candidate) {
                const sendPayload = {
                    userId: this.userId,
                    to: 'all',
                    label: event.candidate.sdpMLineIndex,
                    id: event.candidate.sdpMid,
                    candidate: event.candidate.candidate,
                    sessionType: type,
                }
                send(sendPayload)
            }
            else {
                console.info('Candidate denied', event.candidate);
            }
        }

            peer.pc.onaddstream = (event) => {
                console.log("Adding remote strem", event);

                var id = 'remote-video-' + type;
                this.setState({isPossibleStream: true})
                document.querySelector('#' + id).srcObject = event.stream;
            };

            peer.pc.onremovestream = function (event) {
                console.log("Removing remote stream", event);
            };

            peer.pc.onnegotiationneeded = function (event) {
                console.log("onnegotiationneeded", event);
            };

            peer.pc.onsignalingstatechange = function (event) {
                console.log("onsignalingstatechange", event);
            };

            peer.pc.oniceconnectionstatechange = function (event) {
                console.log("oniceconnectionstatechange",
                    'iceGatheringState: ' + peer.iceGatheringState,
                    '/ iceConnectionState: ' + peer.iceConnectionState);
            }

            // add peers array
            peers.push(peer);

            return peer.pc;
    }


    setRoomToken() {
        //console.log('setRoomToken', arguments);

        if (location.hash.length > 2) {
            this.setState({ href: location.href })
        } else {
            location.hash = '#' + (Math.random() * new Date().getTime()).toString(32).toUpperCase().replace(/\./g, '-');
        }
    }

    initialize() {
        this.setRoomToken();
        this.setClipboard();
        this.roomId = location.href.replace(/\/|:|#|%|\.|\[|\]/g, '')
        //
        // $('#btn-camera').click(function() {
        //     var $this = $(this);
        //     $this.toggleClass('active');
        //
        //     if ($this.hasClass('active')) {
        //         pauseVideo();
        //     } else {
        //         resumeVideo();
        //     }
        // });
        //
        // $('#btn-mic').click(function() {
        //     var $this = $(this);
        //     $this.toggleClass('active');
        //
        //     if ($this.hasClass('active')) {
        //         muteAudio();
        //     } else {
        //         unmuteAudio();
        //     }
        // });
    }



    render() {
        return (
            <div className={styles.wrapper}>
                <section id="share-wrap">
                    <p>2개의 해상도(720p, 90p)를 전달 합니다.</p>
                    <div onClick={this.handleClickLink}>Share this room link</div>
                </section>
                <section id="join-wrap">
                    <p>영상회의를 시작하시겠습니까?</p>
                    <button onClick={this.handleClickButton}>Start</button>
                </section>
                <section id="room-list" />
                <section ref={e => this._refs.videoWrapper = e} className={styles.videoWrapper}>
                    <video
                        ref={e => this._refs["local-video-second"] = e}
                        className={classNames(styles["local-video"], { [styles.isVisible]: !this.state.isPeerConnect })}
                        muted="muted" autoplay="true" title="90p" />
                    <video
                        ref={e => this._refs["local-video-first"] = e}
                        className={classNames(styles["local-video"], { [styles.isVisible]: !this.state.isChatStart })}
                        muted="muted" autoplay="true" title="720p" />
                    <video
                        id="' + id + '"
                        className={classNames(styles["remote-video"], { [styles.isVisible]: !this.state.isPossibleStream })}
                        autoplay="true" />
                    <div className={styles.button}>
                        <button id="btn-camera">Camera Pause</button>
                        <button id="btn-mic">Mic Mute</button>
                    </div>
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
