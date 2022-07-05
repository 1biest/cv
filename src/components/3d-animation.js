import './3d-animation.css';
import EthLogo from '../img/ethereum.svg';

export default function Anim3d() {
    return (
        <div className="anim-3d-wrapper">
          <div className="anim-3d-layer-2"></div>
          <div className="anim-3d-layer-1"></div>
          <div className="anim-3d-layer-3"></div>
          <div className="anim-3d-layer-4">
          </div>
          <div className="anim-3d-layer-5">
          </div>
          <div className="anim-3d-layer-6">
            <img width={'38%'} style={{paddingTop: "18px", paddingLeft: "78px"}} src={EthLogo} />
          </div>
          <div className="anim-3d-layer-bg"></div>
        </div>
    );
  }
