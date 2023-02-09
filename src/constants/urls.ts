import { browserEnv } from "$env"

const urls = {
  homere: 'https://www.homere.shop',
  medium: 'https://cyril-chpn.medium.com',
  mediumFeed: 'https://medium.com/feed/@cyril-chpn',
  linkedIn: 'https://www.linkedin.com/in/cchapon',
  linkedInMarco: 'https://www.linkedin.com/in/marc-antoine-calzada',
  malt: 'https://www.malt.fr/profile/cyrilchapon',
  maltQuote:
    'https://www.malt.fr/project/new?freelanceId=5f7cfd793a399f2641be0ce0&amp;viewId=5fbfd99ec994b74bc573bb54',
  github: 'https://github.com/cyrilchapon',
  githubRepo: 'https://github.com/cyrilchapon/cyc-portfolio',
  devTo: 'https://dev.to/cyrilchapon',
  algar: 'https://www.algar.co',
  citymagine: 'https://citymagine.com',
  cesi: 'https://www.cesi.fr',
  everysens: 'https://www.everysens.com',
  etineo: 'https://etineo.com',
  stackshare: 'https://stackshare.io/cyril_chpn',
  calcom: `https://cal.com/${browserEnv.NEXT_PUBLIC_CALCOM_USER}/${browserEnv.NEXT_PUBLIC_CALCOM_EVENT}`
}

export default urls
