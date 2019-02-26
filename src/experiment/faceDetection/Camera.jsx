import React from 'react'
import PropTypes from 'prop-types'

/**
 * Created by yuepeng.li on 2019/2/20
 */

class Camera extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.openCvInited = false

    this.canvasOutput = null

    this.contextOutput = null
  }

  componentDidMount () {
    this.initWebAssembly()
    this.initVideo()
  }

  openCVIsReady() {
    this.openCvInited = true
  }

  initWebAssembly = () => {
    const self = this
    const Module = {
      wasmBinaryFile: 'https://huningxin.github.io/opencv.js/build/wasm/opencv_js.wasm',
      preRun: [function() {
        Module.FS_createPreloadedFile('/', 'haarcascade_eye.xml', 'https://raw.githubusercontent.com/opencv/opencv/master/data/haarcascades/haarcascade_eye.xml', true, false)
        Module.FS_createPreloadedFile('/', 'haarcascade_frontalface_default.xml', 'https://raw.githubusercontent.com/opencv/opencv/master/data/haarcascades/haarcascade_frontalface_default.xml', true, false)
        Module.FS_createPreloadedFile('/', 'haarcascade_profileface.xml', 'https://raw.githubusercontent.com/opencv/opencv/master/data/haarcascades/haarcascade_profileface.xml', true, false)
      }],
      _main: function() { self.openCVIsReady() }
    }
    window.Module = Module
    document.write('<script async src="https://huningxin.github.io/opencv.js/build/wasm/opencv.js" />')
  }

  initVideo = () => {
    const userMediaConfig = {
      audio: false,
      video: {
        width: 300,
        height: 600
      }
    }
    navigator.mediaDevices.getUserMedia(userMediaConfig).then((mediaStream) => {
      this.video.srcObject = mediaStream
      this.contextOutput = this.canvasOutput.getContext('2d')
    }).catch(function(err) {
      console.log(err)
    })
  }

  process = () => {
    const videoWidth = this.video.videoWidth
    const videoHeight = this.video.videoHeight
    const canvasWidth = this.canvasOutput.clientWidth
    const canvasHeight = this.canvasOutput.clientHeight
    const canvasInput = document.createElement('canvas')
    const contextInput = canvasInput.getContext('2d')
    canvasInput.width = videoWidth
    canvasInput.height = videoHeight
    contextInput.drawImage(this.video, 0, 0, videoWidth, videoHeight)

    const scale = canvasWidth / videoWidth
    const renderHeight = videoHeight * scale
    const topOffset = canvasHeight - renderHeight
    this.contextOutput.drawImage(canvasInput, 0, topOffset, canvasWidth, renderHeight)

    if (this.openCvInited) {
      const srcMat = new window.cv.Mat(videoHeight, videoWidth, window.cv.CV_8UC4)
      const grayMat = new window.cv.Mat(videoHeight, videoWidth, window.cv.CV_8UC1)
      const faceClassifier = new window.cv.CascadeClassifier()
      faceClassifier.load('haarcascade_frontalface_default.xml')

      let imageData = contextInput.getImageData(0, 0, videoWidth, videoHeight)
      srcMat.data.set(imageData.data)
      window.cv.cvtColor(srcMat, grayMat, window.cv.COLOR_RGBA2GRAY)
      let faces = []
      let size
      let faceVect = new window.cv.RectVector()
      let faceMat = new window.cv.Mat()

      window.cv.pyrDown(grayMat, faceMat)
      window.cv.pyrDown(faceMat, faceMat)
      size = faceMat.size()

      faceClassifier.detectMultiScale(faceMat, faceVect)
      for (let i = 0; i < faceVect.size(); i++) {
        let face = faceVect.get(i)
        faces.push(new window.cv.Rect(face.x, face.y, face.width, face.height))
      }
      faceMat.delete()
      faceVect.delete()
      this.drawResults(faces, 'red', size)
    }

  }

  drawResults(results, color, size) {
    const videoWidth = this.video.videoWidth
    const videoHeight = this.video.videoHeight
    const canvasWidth = this.canvasOutput.clientWidth
    const canvasHeight = this.canvasOutput.clientHeight
    const scale = canvasWidth / videoWidth
    const renderHeight = videoHeight * scale
    const topOffset = canvasHeight - renderHeight

    for (let i = 0; i < results.length; ++i) {
      let rect = results[i]
      let xRatio = videoWidth * scale / size.width
      let yRatio = videoHeight * scale / size.height
      this.contextOutput.lineWidth = 3
      this.contextOutput.strokeStyle = color
      this.contextOutput.strokeRect(
        rect.x * xRatio,
        topOffset + rect.y * yRatio,
        rect.width * xRatio,
        rect.height * yRatio
      )
    }
  }

  getFrame = () => {
    this.process()
    setTimeout(() => {
      this.getFrame()
    }, 0)
  }

  render () {
    return (
      <div className="box" style={{width: '100%', height: '100%'}}>
        <video
          id='camera-video'
          onLoadedMetadata={() => this.video.play()}
          onPlay={() => this.getFrame()}
          ref={c => this.video = c} src="" style={{display: 'none'}}/>
        <canvas id='before-process' ref={c => this.canvasOutput = c} width={document.body.clientWidth} height={document.body.clientHeight} />
      </div>
    )
  }
}

Camera.propTypes = {
  foo: PropTypes.string
}

export default Camera
