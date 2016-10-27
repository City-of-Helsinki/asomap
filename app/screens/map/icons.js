import L from 'leaflet';

import asuntosaation from 'assets/images/markers/asomarker-asuntosaation.png';
import asuntosaation2x from 'assets/images/markers/asomarker-asuntosaation@2x.png';
import avain from 'assets/images/markers/asomarker-avain.png';
import avain2x from 'assets/images/markers/asomarker-avain@2x.png';
import helsingin from 'assets/images/markers/asomarker-helsingin.png';
import helsingin2x from 'assets/images/markers/asomarker-helsingin@2x.png';
import kantasuomen from 'assets/images/markers/asomarker-kantasuomen.png';
import kantasuomen2x from 'assets/images/markers/asomarker-kantasuomen@2x.png';
import setlementti from 'assets/images/markers/asomarker-setlementti.png';
import setlementti2x from 'assets/images/markers/asomarker-setlementti@2x.png';
import suomenomakoti from 'assets/images/markers/asomarker-suomenomakoti.png';
import suomenomakoti2x from 'assets/images/markers/asomarker-suomenomakoti@2x.png';
import ta from 'assets/images/markers/asomarker-ta.png';
import ta2x from 'assets/images/markers/asomarker-ta@2x.png';

const images = {
  asuntosaation,
  asuntosaation2x,
  avain,
  avain2x,
  helsingin,
  helsingin2x,
  kantasuomen,
  kantasuomen2x,
  setlementti,
  setlementti2x,
  suomenomakoti,
  suomenomakoti2x,
  ta,
  ta2x,
};

const MarkerIcon = L.Icon.extend({
  options: {
    iconSize: [30, 35],
    iconAnchor: [14, 34],
    popupAnchor: [1, -24],
  },
});

function createIcon(name) {
  return new MarkerIcon({
    iconUrl: images[name],
    iconRetinaUrl: images[`${name}2x`],
  });
}

export default {
  asuntosaation: createIcon('asuntosaation'),
  avain: createIcon('avain'),
  helsingin: createIcon('helsingin'),
  kantasuomen: createIcon('kantasuomen'),
  setlementti: createIcon('setlementti'),
  suomenomakoti: createIcon('suomenomakoti'),
  ta: createIcon('ta'),
};
