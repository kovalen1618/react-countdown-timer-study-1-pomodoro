import ReactSlider from "react-slider"
import './Slider.css'
import { useContext } from "react"
import SettingsContext from "./context/SettingsContext"
import BackButton from "./utils/BackButton";

function Settings() {
  const settingsInfo = useContext(SettingsContext);

  return (
    <div style={{textAlign:'left'}}>
        <label>Work minutes: {settingsInfo.workMinutes}:00</label>
        <ReactSlider
            className="slider"
            thumbClassName="thumb"
            trackClassName="track"
            value={settingsInfo.workMinutes}
            // Changing the value of a state prop
            onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
            min={1}
            max={120}
        />
        <label>Break minutes: {settingsInfo.breakMinutes}:00</label>
        <ReactSlider
            className="slider green"
            thumbClassName="thumb"
            trackClassName="track"
            value={settingsInfo.breakMinutes}
            onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
            min={1}
            max={120}
        />
        <div style={{textAlign:'center', marginTop:'20px'}}>
          <BackButton onClick={() => {
            settingsInfo.setShowSettings(false);
          }} />
        </div>
    </div>
  )
}
export default Settings