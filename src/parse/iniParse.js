import ini from 'js-ini';

export default function iniParse(iniData) {
  return JSON.parse(JSON.stringify(ini.parse(iniData)));
}
