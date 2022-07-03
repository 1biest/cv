import ProfilePhoto from '../img/logan-profile-photo.jpg';


export default function ImgMediaCard() {
    return (
        <div className="profilePhoto">
            <img src={ProfilePhoto} width="100" alt="Logan Biesterfeldt" />
        </div>
    );
  }
  