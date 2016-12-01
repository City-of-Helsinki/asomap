import L from 'leaflet';

import asuntosaation from 'assets/images/markers/asomarker-asuntosaation.png';
import asuntosaation2x from 'assets/images/markers/asomarker-asuntosaation@2x.png';
import avain from 'assets/images/markers/asomarker-avain.png';
import avain2x from 'assets/images/markers/asomarker-avain@2x.png';
import helas from 'assets/images/markers/asomarker-helas.png';
import helas2x from 'assets/images/markers/asomarker-helas@2x.png';
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

const ownerImages = {
  asuntosaation,
  asuntosaation2x,
  avain,
  avain2x,
  helas,
  helas2x,
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

const unknownOwnerImage = suomenomakoti;

const ownerMap = {
  'AVAIN Asumisoikeus Oy': 'avain',
  'Asumisoikeusyhdistys Suomen Omakoti': 'suomenomakoti',
  'Asuntosäätiön Asumisoikeus Oy': 'asuntosaation',
  'Helsingin Asumisoikeus Oy': 'helsingin',
  'Helsingin Seudun Asumisoikeusyhdistys HELAS': 'helas',
  'Kanta-Suomen Asumisoikeusyhdistys': 'kantasuomen',
  'Setlementtiasumisoikeus Oy': 'setlementti',
  'TA-Asumisoikeus Oy': 'ta',
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
    iconUrl: ownerImages[name],
    iconRetinaUrl: ownerImages[`${name}2x`],
  });
}

const ownerMarkerIcons = {
  asuntosaation: createIcon('asuntosaation'),
  avain: createIcon('avain'),
  helas: createIcon('helas'),
  helsingin: createIcon('helsingin'),
  kantasuomen: createIcon('kantasuomen'),
  setlementti: createIcon('setlementti'),
  suomenomakoti: createIcon('suomenomakoti'),
  ta: createIcon('ta'),
};

const unknownOwnerMarker = createIcon('suomenomakoti');

export function getOwnerImage(owner) {
  return ownerImages[ownerMap[owner]] || unknownOwnerImage;
}

export function getOwnerMarkerIcon(owner) {
  return ownerMarkerIcons[ownerMap[owner]] || unknownOwnerMarker;
}

export function unitMatchesFilters(unit, city, owners, postalCodes) {
  return (
    (city === '' || unit.city === city) &&
    (owners.length === 0 || owners.indexOf(unit.owner) !== -1) &&
    (postalCodes.length === 0 || postalCodes.indexOf(unit.addressZip) !== -1)
  );
}

export function countFilteredUnits(units, city, owners, postalCodes) {
  return units.reduce(
    (value, unit) => value + Number(unitMatchesFilters(unit, city, owners, postalCodes)),
    0
  );
}
