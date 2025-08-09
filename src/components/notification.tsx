import React, { } from "react";
import { animated, useSpring } from '@react-spring/web';
import '../css/notifaction.css';

interface notficationProps {
  notiText: string,
  isNotified: boolean
}

//@ts-ignore
function Notification({ notiText, isNotified }: notficationProps) {
  //@ts-ignore
  // const [notfication, setNotification] = useState<string>("");
  // const [isNotified, setNotified] = useState<boolean>(false);

  const slideAnimation = useSpring({
    right: isNotified ? "0%" : "-75%",
    opacity: isNotified ? 1 : 0,
    config: { tension: 200, friction: 20 },
  });
  console.log(notiText, isNotified);


  return (
    <React.Fragment>
      <animated.div
        {...{ style: slideAnimation, className: "notification" }}
      >
        <p className="notfication-text"
        >{notiText}</p>
      </animated.div>
    </React.Fragment>
  );
}

export default Notification;
