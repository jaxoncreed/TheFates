import React, {Component, PropTypes} from 'react';
import s from 'components/styles/index.scss';

class VideoPlayer extends Component {
  static propTypes = {
    goTo: PropTypes.number
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.goTo !== this.props.goTo) {
      this.refs.video.pause();
      this.refs.video.currentTime = nextProps.goTo;
      this.refs.video.play();
    }
  }
  render() {
    return (
			<div className={s.videoContainer}>
        <div className={s.videoPlayer}>
  				<video controls autoPlay ref="video">
  					<source src="/test.mp4" type="video/mp4" />
  				</video>
        </div>
			</div>
		);
  }
}

export default VideoPlayer;
