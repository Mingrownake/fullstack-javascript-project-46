import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({ ignoreAttributes: true, ignoreDeclaration: true });
export default function xmlParse(xmlData) {
  const parsed = parser.parse(xmlData);
  return Object.values(parsed)[0];
}
