import ReactSlider from "react-slider"
import './Slider.css'

function Settings() {
  return (
    <div style={{textAlign:'left'}}>
        <label>Work minutes:</label>
        <ReactSlider
            className="slider"
            thumbClassName="thumb"
            trackClassName="track"
            value={45}
            min={1}
            max={120}
        />
        <label>Break minutes:</label>
        <ReactSlider
            className="slider green"
            thumbClassName="thumb"
            trackClassName="track"
            value={45}
            min={1}
            max={120}
        />
    </div>
  )
}
export default Settings