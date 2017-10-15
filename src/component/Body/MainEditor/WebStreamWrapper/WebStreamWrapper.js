/* */
import React from 'react'
import autobind from 'core-decorators/lib/autobind'
import PropTypes from 'prop-types'

/* */
import styles from './WebStreamWrapper.scss'

class WebStreamWrapper extends React.Component {

    constructor() {
        super()
        this._refs = {}
        this.state = {
            token: '',
            href: '#',
        }
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
        window.navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia
    }

    @autobind
    handleClickButton() {
        navigator.getUserMedia({ audio: true, video: { width: 1280, height: 720 }}, (stream) => {
            this.localStream = stream;
            $videoWrap.append('<video id="local-video-large" class="local-video" muted="muted" autoplay="true" title="720p"></video>');
            document.querySelector('#local-video-large').srcObject = this.localStream;
            $body.addClass('room wait');
            $tokenWrap.slideDown(1000);

            if (isOffer) {
                var peer = createPeerConnection('large');
                createOffer('large', peer, localStream);
            }

            createSmallVideo();
        }, function() {
            console.error('Error getUserMedia');
        });
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

        $('#btn-camera').click(function() {
            var $this = $(this);
            $this.toggleClass('active');

            if ($this.hasClass('active')) {
                pauseVideo();
            } else {
                resumeVideo();
            }
        });

        $('#btn-mic').click(function() {
            var $this = $(this);
            $this.toggleClass('active');

            if ($this.hasClass('active')) {
                muteAudio();
            } else {
                unmuteAudio();
            }
        });
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
                <section className={styles.videoWrapper} ref={e => this._refs.videoWrapper = e}>
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
