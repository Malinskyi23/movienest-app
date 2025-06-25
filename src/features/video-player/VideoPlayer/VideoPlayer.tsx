import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import styles from './VideoPlayer.module.css';

type Props = {
  kpId: number;
};

export const VideoPlayer = ({ kpId }: Props) => {
  const [scriptHtml, setScriptHtml] = useState('');

  useEffect(() => {
    if (!kpId) return;

    const fetchUrl = `//pleer.videoplayers.club/get_player?w=610&h=370&type=widget&kp_id=${kpId}&players=videocdn,hdvb,bazon,alloha,ustore,kodik,trailer,torrent&r_id=videoplayers&vni=VIDEOCDN&vti=&vdi=&hni=HDVB&hti=&hdi=&bni=BAZON&bti=&bdi=&alni=ALLOHATV&alti=&aldi=&usni=USTOREBZ&usti=&usdi=&koni=KODIK&koti=&kodi=&tti=&ru=${window.location.href}`;

    fetch(fetchUrl)
      .then(res => res.text())
      .then(data => {
        const iframes = data.match(/<iframe.*?<\/iframe>/gm);
        if (iframes && iframes.length > 1) {
          setScriptHtml(iframes[1]);
        } else if (iframes && iframes.length === 1) {
          setScriptHtml(iframes[0]);
        } else {
          setScriptHtml('<div>Плеер не найден</div>');
        }
      })
      .catch(() => {
        setScriptHtml('<div>Ошибка загрузки плеера</div>');
      });
  }, [kpId]);

  return (
    <div
      className={classNames('uitools', styles.video)}
      id="videoplayers"
      dangerouslySetInnerHTML={{ __html: scriptHtml }}
    />
  );
};
