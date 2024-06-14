import { groupIconsByCategory, type IconMetadata } from "./utils.js";

/**
 * Metadata for all available onyx icons.
 */
export const ICON_METADATA = {
  "24h": {
    category: "Help & Support",
  },
  alarm: {
    category: "Devices & Electronics",
  },
  "alarm-disabled": {
    category: "Devices & Electronics",
  },
  "android-phone": {
    category: "Devices & Electronics",
  },
  "android-tablet": {
    category: "Devices & Electronics",
  },
  "android-tablet-landscape": {
    category: "Devices & Electronics",
  },
  applause: {
    category: "People & User",
  },
  "apple-phone": {
    category: "Devices & Electronics",
  },
  "apple-store": {
    category: "Software & Services",
  },
  "apple-tablet": {
    category: "Devices & Electronics",
  },
  "apple-tablet-landscape": {
    category: "Devices & Electronics",
  },
  archive: {
    category: "Business & Statistics",
  },
  "archive-undo": {
    category: "Business & Statistics",
  },
  "arrow-big": {
    category: "Arrows",
  },
  "arrow-down": {
    category: "Arrows",
  },
  "arrow-left": {
    category: "Arrows",
  },
  "arrow-right": {
    category: "Arrows",
  },
  "arrow-small-down-left": {
    category: "Arrows",
  },
  "arrow-small-down-right": {
    category: "Arrows",
  },
  "arrow-small-left": {
    category: "Arrows",
  },
  "arrow-small-right": {
    category: "Arrows",
  },
  "arrow-small-up-left": {
    category: "Arrows",
  },
  "arrow-small-up-right": {
    category: "Arrows",
  },
  "arrow-up": {
    category: "Arrows",
  },
  "arrow-small-down": {
    category: "Arrows",
  },
  "arrow-small-up": {
    category: "Arrows",
  },
  "arrows-sort": {
    category: "Arrows",
  },
  attachment: {
    category: "Action & Interface",
  },
  audio: {
    category: "File & Type",
  },
  bag: {
    category: "Commerce & Shopping",
  },
  bank: {
    category: "Finance",
  },
  "bank-note": {
    category: "Finance",
  },
  "bar-graph": {
    category: "Business & Statistics",
  },
  barcode: {
    category: "Commerce & Shopping",
  },
  battery: {
    category: "Car Parts",
  },
  bell: {
    category: "Action & Interface",
  },
  "bell-disabled": {
    category: "Action & Interface",
  },
  "bell-ring": {
    category: "Action & Interface",
  },
  bill: {
    category: "Finance",
  },
  "birthday-cake": {
    category: "Kitchen & Food",
  },
  bluetooth: {
    category: "Connectivity",
  },
  bomb: {
    category: "Various",
  },
  book: {
    category: "School & Education",
  },
  "book-globe": {
    category: "Network & Infrastructure",
  },
  bookmark: {
    category: "Action & Interface",
  },
  box: {
    category: "Action & Interface",
  },
  "box-check": {
    category: "Action & Interface",
  },
  bread: {
    category: "Kitchen & Food",
  },
  "browser-globe": {
    category: "Network & Infrastructure",
  },
  "browser-programming": {
    category: "Network & Infrastructure",
  },
  "browser-terminal": {
    category: "Network & Infrastructure",
  },
  brush: {
    category: "Objects",
  },
  bucket: {
    category: "Software & Services",
  },
  bus: {
    category: "Transport & Travel",
  },
  calculator: {
    category: "Devices & Electronics",
  },
  calendar: {
    category: "Action & Interface",
  },
  "calendar-clock": {
    category: "Action & Interface",
  },
  "calendar-days-one": {
    category: "Action & Interface",
  },
  "calendar-days-three": {
    category: "Action & Interface",
  },
  "calendar-settings": {
    category: "Action & Interface",
  },
  "calendar-week": {
    category: "Action & Interface",
  },
  camera: {
    category: "Devices & Electronics",
  },
  "camera-disabled": {
    category: "Devices & Electronics",
  },
  "camera-plus": {
    category: "Devices & Electronics",
  },
  "camera-x": {
    category: "Devices & Electronics",
  },
  "cancellation-undone": {
    category: "Action & Interface",
  },
  "car-check": {
    category: "Transport & Travel",
  },
  "car-door": {
    category: "Car Parts",
  },
  "car-front-1": {
    category: "Transport & Travel",
  },
  "car-front-2": {
    category: "Transport & Travel",
  },
  "car-search": {
    category: "Transport & Travel",
  },
  "car-seat": {
    category: "Car Parts",
  },
  "car-setting": {
    category: "Transport & Travel",
  },
  "car-window": {
    category: "Car Parts",
  },
  cart: {
    category: "Commerce & Shopping",
  },
  "cart-check": {
    category: "Commerce & Shopping",
  },
  cash: {
    category: "Finance",
  },
  "cash-register": {
    category: "Commerce & Shopping",
  },
  chart: {
    category: "Business & Statistics",
  },
  "chart-down": {
    category: "Business & Statistics",
  },
  "chart-pie-1": {
    category: "Business & Statistics",
  },
  "chart-pie-2": {
    category: "Business & Statistics",
  },
  "chart-pie-search": {
    category: "Business & Statistics",
  },
  "chart-up": {
    category: "Business & Statistics",
  },
  check: {
    category: "Essentials",
  },
  "check-small": {
    category: "Essentials",
  },
  "chevron-down": {
    category: "Arrows",
  },
  "chevron-down-small": {
    category: "Arrows",
  },
  "chevron-left": {
    category: "Arrows",
  },
  "chevron-left-small": {
    category: "Arrows",
  },
  "chevron-right": {
    category: "Arrows",
  },
  "chevron-right-small": {
    category: "Arrows",
  },
  "chevron-up": {
    category: "Arrows",
  },
  "chevron-up-small": {
    category: "Arrows",
  },
  "circle-arrow-left": {
    category: "Arrows",
  },
  "circle-arrow-right": {
    category: "Arrows",
  },
  "circle-attention": {
    category: "Essentials",
  },
  "circle-block": {
    category: "Essentials",
  },
  "circle-both-direction": {
    category: "Arrows",
  },
  "circle-car": {
    category: "Navigation",
  },
  "circle-car-disabled": {
    category: "Navigation",
  },
  "circle-check": {
    category: "Essentials",
  },
  "circle-crypto-bitcoin": {
    category: "Finance",
  },
  "circle-help": {
    category: "Essentials",
  },
  "circle-information": {
    category: "Essentials",
  },
  "circle-minus": {
    category: "Essentials",
  },
  "circle-minus-disabled": {
    category: "Essentials",
  },
  "circle-plus": {
    category: "Essentials",
  },
  "circle-x": {
    category: "Essentials",
  },
  clipboard: {
    category: "File & Type",
  },
  "clipboard-circle-check": {
    category: "File & Type",
  },
  "clipboard-edit": {
    category: "File & Type",
  },
  "clipboard-lock": {
    category: "File & Type",
  },
  "clipboard-plus": {
    category: "File & Type",
  },
  "clipboard-search": {
    category: "File & Type",
  },
  "clipboard-shield": {
    category: "File & Type",
  },
  clock: {
    category: "Action & Interface",
  },
  "clock-circle-check": {
    category: "Action & Interface",
  },
  "clock-edit": {
    category: "Action & Interface",
  },
  cloud: {
    category: "Weather & Climate",
  },
  "cloud-2": {
    category: "Weather & Climate",
  },
  "cloud-arrow-up": {
    category: "Network & Infrastructure",
  },
  "cloud-co2": {
    category: "Weather & Climate",
  },
  "cloud-connect": {
    category: "Network & Infrastructure",
  },
  "cloud-foundry": {
    category: "Software & Services",
  },
  "cloud-key": {
    category: "Network & Infrastructure",
  },
  "cloud-lock": {
    category: "Network & Infrastructure",
  },
  "cloud-setting": {
    category: "Network & Infrastructure",
  },
  "coffee-cup": {
    category: "Kitchen & Food",
  },
  colors: {
    category: "Objects",
  },
  "compact-disc": {
    category: "Hardware",
  },
  company: {
    category: "Business & Statistics",
  },
  "company-location": {
    category: "Business & Statistics",
  },
  "company-lock": {
    category: "Business & Statistics",
  },
  "company-settings": {
    category: "Business & Statistics",
  },
  compass: {
    category: "Navigation",
  },
  computer: {
    category: "Devices & Electronics",
  },
  "computer-argus": {
    category: "Software & Services",
  },
  "computer-audio": {
    category: "Devices & Electronics",
  },
  "computer-bell": {
    category: "Devices & Electronics",
  },
  "computer-block": {
    category: "Devices & Electronics",
  },
  "computer-calendar": {
    category: "Devices & Electronics",
  },
  "computer-camera": {
    category: "Devices & Electronics",
  },
  "computer-circle-check": {
    category: "Devices & Electronics",
  },
  "computer-circle-minus": {
    category: "Devices & Electronics",
  },
  "computer-clock": {
    category: "Devices & Electronics",
  },
  "computer-cloud": {
    category: "Devices & Electronics",
  },
  "computer-cube": {
    category: "Devices & Electronics",
  },
  "computer-drop": {
    category: "Devices & Electronics",
  },
  "computer-edit": {
    category: "Devices & Electronics",
  },
  "computer-globe": {
    category: "Devices & Electronics",
  },
  "computer-information": {
    category: "Devices & Electronics",
  },
  "computer-key": {
    category: "Devices & Electronics",
  },
  "computer-location": {
    category: "Devices & Electronics",
  },
  "computer-lock": {
    category: "Devices & Electronics",
  },
  "computer-message": {
    category: "Devices & Electronics",
  },
  "computer-plus": {
    category: "Devices & Electronics",
  },
  "computer-search": {
    category: "Devices & Electronics",
  },
  "computer-settings": {
    category: "Devices & Electronics",
  },
  "computer-shield": {
    category: "Devices & Electronics",
  },
  "computer-user": {
    category: "Devices & Electronics",
  },
  "computer-volume": {
    category: "Devices & Electronics",
  },
  "computer-x": {
    category: "Devices & Electronics",
  },
  copy: {
    category: "Action & Interface",
  },
  couchbase: {
    category: "Software & Services",
  },
  cpu: {
    category: "Hardware",
  },
  "credit-card": {
    category: "Finance",
  },
  "crypto-bitcoin": {
    category: "Finance",
  },
  cup: {
    category: "Gamification",
  },
  dashboard: {
    category: "Action & Interface",
  },
  database: {
    category: "Network & Infrastructure",
  },
  delete: {
    category: "Action & Interface",
  },
  "detour-1": {
    category: "Navigation",
  },
  "detour-2": {
    category: "Navigation",
  },
  dinosaur: {
    category: "Various",
  },
  disc: {
    category: "Hardware",
  },
  docker: {
    category: "Software & Services",
  },
  download: {
    category: "Network & Infrastructure",
  },
  draggable: {
    category: "Action & Interface",
  },
  "draggable-horizontal": {
    category: "Action & Interface",
  },
  driver: {
    category: "Transport & Travel",
  },
  duplicate: {
    category: "Action & Interface",
  },
  dynamite: {
    category: "Various",
  },
  ear: {
    category: "People & User",
  },
  earth: {
    category: "Navigation",
  },
  "earth-location-pin": {
    category: "Navigation",
  },
  edit: {
    category: "Action & Interface",
  },
  "edit-disabled": {
    category: "Action & Interface",
  },
  elasticsearch: {
    category: "Software & Services",
  },
  "emoji-happy-1": {
    category: "Emojies",
  },
  "emoji-happy-2": {
    category: "Emojies",
  },
  "emoji-laughing": {
    category: "Emojies",
  },
  "emoji-neutral-1": {
    category: "Emojies",
  },
  "emoji-neutral-2": {
    category: "Emojies",
  },
  "emoji-sad": {
    category: "Emojies",
  },
  "emoji-unhappy": {
    category: "Emojies",
  },
  engine: {
    category: "Car Parts",
  },
  "error-flag": {
    category: "Action & Interface",
  },
  ethernet: {
    category: "Software & Services",
  },
  "expand-window": {
    category: "Action & Interface",
  },
  explosion: {
    category: "Various",
  },
  eye: {
    category: "Action & Interface",
  },
  "eye-disabled": {
    category: "Action & Interface",
  },
  "eye-shine": {
    category: "Action & Interface",
  },
  "face-id": {
    category: "Security & Protection",
  },
  feedback: {
    category: "Communication",
  },
  figure: {
    category: "People & User",
  },
  file: {
    category: "File & Type",
  },
  "file-archive": {
    category: "File & Type",
  },
  "file-audio": {
    category: "File & Type",
  },
  "file-blank": {
    category: "File & Type",
  },
  "file-blocked": {
    category: "File & Type",
  },
  "file-chart": {
    category: "File & Type",
  },
  "file-checklist": {
    category: "File & Type",
  },
  "file-circle-check": {
    category: "File & Type",
  },
  "file-clock": {
    category: "File & Type",
  },
  "file-copy": {
    category: "File & Type",
  },
  "file-csv": {
    category: "File & Type",
  },
  "file-disabled": {
    category: "File & Type",
  },
  "file-doc": {
    category: "File & Type",
  },
  "file-edit": {
    category: "File & Type",
  },
  "file-globe": {
    category: "File & Type",
  },
  "file-key": {
    category: "File & Type",
  },
  "file-lock": {
    category: "File & Type",
  },
  "file-pdf": {
    category: "File & Type",
  },
  "file-plus": {
    category: "File & Type",
  },
  "file-ppt": {
    category: "File & Type",
  },
  "file-rtf": {
    category: "File & Type",
  },
  "file-search": {
    category: "File & Type",
  },
  "file-settings": {
    category: "File & Type",
  },
  "file-shield": {
    category: "File & Type",
  },
  "file-shred": {
    category: "File & Type",
  },
  "file-sketch": {
    category: "File & Type",
  },
  "file-text": {
    category: "File & Type",
  },
  "file-user": {
    category: "File & Type",
  },
  "file-x": {
    category: "File & Type",
  },
  "file-xls": {
    category: "File & Type",
  },
  "file-xlsx": {
    category: "File & Type",
  },
  filter: {
    category: "Action & Interface",
  },
  fingerprint: {
    category: "Security & Protection",
  },
  "fire-extinguisher": {
    category: "Security & Protection",
  },
  "flag-1": {
    category: "Navigation",
  },
  "flag-2": {
    category: "Navigation",
  },
  flash: {
    category: "Weather & Climate",
  },
  "flash-disabled": {
    category: "Weather & Climate",
  },
  folder: {
    category: "File & Type",
  },
  "folder-connect": {
    category: "Network & Infrastructure",
  },
  "folder-plus": {
    category: "File & Type",
  },
  forklift: {
    category: "Business & Statistics",
  },
  forward: {
    category: "Arrows",
  },
  fullscreen: {
    category: "Action & Interface",
  },
  "fullscreen-exit": {
    category: "Action & Interface",
  },
  gallery: {
    category: "Hardware",
  },
  glasses: {
    category: "School & Education",
  },
  globe: {
    category: "Network & Infrastructure",
  },
  "globe-connect": {
    category: "Network & Infrastructure",
  },
  "globe-lock": {
    category: "Network & Infrastructure",
  },
  "graduation-hat": {
    category: "School & Education",
  },
  "graph-search": {
    category: "Business & Statistics",
  },
  grid: {
    category: "Action & Interface",
  },
  "hand-coin": {
    category: "Finance",
  },
  "hand-drop": {
    category: "Health, Medicine & Hygiene",
  },
  handshake: {
    category: "Cursor & Hands",
  },
  headset: {
    category: "Help & Support",
  },
  "health-probe": {
    category: "Software & Services",
  },
  heart: {
    category: "Health, Medicine & Hygiene",
  },
  hibernate: {
    category: "Software & Services",
  },
  history: {
    category: "Action & Interface",
  },
  home: {
    category: "Navigation",
  },
  "home-location-pin": {
    category: "Navigation",
  },
  "home-search": {
    category: "Navigation",
  },
  hourglass: {
    category: "Objects",
  },
  inbox: {
    category: "Communication",
  },
  "inbox-in": {
    category: "Communication",
  },
  "inbox-out": {
    category: "Communication",
  },
  key: {
    category: "Security & Protection",
  },
  "key-arrow-up": {
    category: "Security & Protection",
  },
  "key-circle-check": {
    category: "Security & Protection",
  },
  "key-shield": {
    category: "Security & Protection",
  },
  keyboard: {
    category: "Devices & Electronics",
  },
  kilometer: {
    category: "Navigation",
  },
  kubernetes: {
    category: "Software & Services",
  },
  laptop: {
    category: "Devices & Electronics",
  },
  "layer-down": {
    category: "Tools & Shapes",
  },
  "layer-up": {
    category: "Tools & Shapes",
  },
  "light-bulb": {
    category: "Objects",
  },
  "light-bulb-shine": {
    category: "Objects",
  },
  link: {
    category: "Action & Interface",
  },
  "link-unlink": {
    category: "Action & Interface",
  },
  list: {
    category: "Action & Interface",
  },
  "load-balancer": {
    category: "Network & Infrastructure",
  },
  "loading-circle": {
    category: "Essentials",
  },
  "loading-dots": {
    category: "Essentials",
  },
  "loaf-bread": {
    category: "Kitchen & Food",
  },
  "location-pin": {
    category: "Navigation",
  },
  "location-pin-disabled": {
    category: "Navigation",
  },
  "location-pin-minus": {
    category: "Navigation",
  },
  "location-pin-plus": {
    category: "Navigation",
  },
  "location-target": {
    category: "Navigation",
  },
  "location-user-minus": {
    category: "People & User",
  },
  "location-user-plus": {
    category: "People & User",
  },
  lock: {
    category: "Security & Protection",
  },
  "lock-key": {
    category: "Security & Protection",
  },
  login: {
    category: "Action & Interface",
  },
  logme: {
    category: "Software & Services",
  },
  logout: {
    category: "Action & Interface",
  },
  luggage: {
    category: "Transport & Travel",
  },
  magnet: {
    category: "Objects",
  },
  mail: {
    category: "Communication",
  },
  "mail-read": {
    category: "Communication",
  },
  "mail-unread": {
    category: "Communication",
  },
  map: {
    category: "Navigation",
  },
  "map-information": {
    category: "Navigation",
  },
  "map-search": {
    category: "Navigation",
  },
  mariadb: {
    category: "Software & Services",
  },
  "mask-1": {
    category: "Health, Medicine & Hygiene",
  },
  "mask-2": {
    category: "Health, Medicine & Hygiene",
  },
  "media-next": {
    category: "Media",
  },
  "media-pause": {
    category: "Media",
  },
  "media-play": {
    category: "Media",
  },
  "media-previous": {
    category: "Media",
  },
  "media-stop": {
    category: "Media",
  },
  "meetingpoint-arrow": {
    category: "Navigation",
  },
  "meetingpoint-pin": {
    category: "Navigation",
  },
  "megaphone-new": {
    category: "Objects",
  },
  "megaphone-old": {
    category: "Objects",
  },
  memory: {
    category: "Hardware",
  },
  menu: {
    category: "Action & Interface",
  },
  mesh: {
    category: "Network & Infrastructure",
  },
  message: {
    category: "Communication",
  },
  "message-conversation": {
    category: "Communication",
  },
  "message-dots": {
    category: "Communication",
  },
  "message-globe": {
    category: "Network & Infrastructure",
  },
  "message-mobile": {
    category: "Communication",
  },
  mic: {
    category: "Communication",
  },
  "mic-active": {
    category: "Communication",
  },
  "mic-disabled": {
    category: "Communication",
  },
  minus: {
    category: "Essentials",
  },
  "minus-small": {
    category: "Essentials",
  },
  "mobile-signal": {
    category: "Connectivity",
  },
  "mongo-db": {
    category: "Software & Services",
  },
  moon: {
    category: "Weather & Climate",
  },
  "more-horizontal": {
    category: "Action & Interface",
  },
  "more-horizontal-big": {
    category: "Action & Interface",
  },
  "more-vertical": {
    category: "Action & Interface",
  },
  mouse: {
    category: "Devices & Electronics",
  },
  move: {
    category: "Arrows",
  },
  "navigation-arrow": {
    category: "Navigation",
  },
  "navigation-direction": {
    category: "Navigation",
  },
  "navigation-route": {
    category: "Navigation",
  },
  network: {
    category: "Network & Infrastructure",
  },
  "network-router": {
    category: "Network & Infrastructure",
  },
  newspaper: {
    category: "Business & Statistics",
  },
  "newspaper-voucher": {
    category: "Business & Statistics",
  },
  "node-pool": {
    category: "Software & Services",
  },
  "notebook-edit": {
    category: "File & Type",
  },
  "notebook-plus": {
    category: "File & Type",
  },
  notebooks: {
    category: "File & Type",
  },
  "notification-flag": {
    category: "Action & Interface",
  },
  opactiy: {
    category: "Tools & Shapes",
  },
  opsgenie: {
    category: "Software & Services",
  },
  "organigram-chart-1": {
    category: "Business & Statistics",
  },
  "organigram-chart-2": {
    category: "Business & Statistics",
  },
  os: {
    category: "Software & Services",
  },
  oven: {
    category: "Kitchen & Food",
  },
  package: {
    category: "Business & Statistics",
  },
  "pallet-box": {
    category: "Business & Statistics",
  },
  "pallet-boxes": {
    category: "Business & Statistics",
  },
  parking: {
    category: "Transport & Travel",
  },
  "parking-disabled": {
    category: "Transport & Travel",
  },
  "parking-electric": {
    category: "Transport & Travel",
  },
  passenger: {
    category: "Transport & Travel",
  },
  "password-generate": {
    category: "Network & Infrastructure",
  },
  "password-lock": {
    category: "Network & Infrastructure",
  },
  "password-lock-2": {
    category: "Network & Infrastructure",
  },
  paypal: {
    category: "Finance",
  },
  penguin: {
    category: "Software & Services",
  },
  "petrol-station": {
    category: "Transport & Travel",
  },
  "petrol-station-electric": {
    category: "Transport & Travel",
  },
  "petrol-station-fuel": {
    category: "Transport & Travel",
  },
  phone: {
    category: "Communication",
  },
  "phone-contact": {
    category: "People & User",
  },
  "phone-disabled": {
    category: "Communication",
  },
  "phone-incoming": {
    category: "Communication",
  },
  "phone-outgoing": {
    category: "Communication",
  },
  "phone-ring": {
    category: "Communication",
  },
  "phone-vibration": {
    category: "Communication",
  },
  picture: {
    category: "File & Type",
  },
  "picture-settings": {
    category: "File & Type",
  },
  pin: {
    category: "School & Education",
  },
  "pin-disabled": {
    category: "School & Education",
  },
  placeholder: {
    category: "Various",
  },
  plane: {
    category: "Transport & Travel",
  },
  plate: {
    category: "Car Parts",
  },
  playstore: {
    category: "Software & Services",
  },
  plus: {
    category: "Essentials",
  },
  "plus-small": {
    category: "Essentials",
  },
  postgresql: {
    category: "Software & Services",
  },
  power: {
    category: "Network & Infrastructure",
  },
  powerbank: {
    category: "Devices & Electronics",
  },
  "presention-board": {
    category: "Business & Statistics",
  },
  "presention-board-graph": {
    category: "Business & Statistics",
  },
  print: {
    category: "Devices & Electronics",
  },
  "print-block": {
    category: "Devices & Electronics",
  },
  "print-checkmark": {
    category: "Devices & Electronics",
  },
  "print-clock": {
    category: "Devices & Electronics",
  },
  "print-cloud": {
    category: "Devices & Electronics",
  },
  "print-disabled": {
    category: "Devices & Electronics",
  },
  "print-drop": {
    category: "Devices & Electronics",
  },
  "print-information": {
    category: "Devices & Electronics",
  },
  "print-plus": {
    category: "Devices & Electronics",
  },
  "print-search": {
    category: "Devices & Electronics",
  },
  "print-settings": {
    category: "Devices & Electronics",
  },
  "print-shield": {
    category: "Devices & Electronics",
  },
  "print-x": {
    category: "Devices & Electronics",
  },
  profile: {
    category: "People & User",
  },
  "puzzle-1": {
    category: "Objects",
  },
  "puzzle-2": {
    category: "Objects",
  },
  "qr-code": {
    category: "Network & Infrastructure",
  },
  quality: {
    category: "Various",
  },
  rabbitmq: {
    category: "Software & Services",
  },
  radar: {
    category: "Navigation",
  },
  "radar-station": {
    category: "Objects",
  },
  reconciliation: {
    category: "Software & Services",
  },
  recycling: {
    category: "Business & Statistics",
  },
  redis: {
    category: "Software & Services",
  },
  repeat: {
    category: "Arrows",
  },
  replace: {
    category: "Arrows",
  },
  robot: {
    category: "Objects",
  },
  "robot-manufacture": {
    category: "Objects",
  },
  rocket: {
    category: "Objects",
  },
  rotate: {
    category: "Arrows",
  },
  "rotate-picture": {
    category: "Tools & Shapes",
  },
  router: {
    category: "Network & Infrastructure",
  },
  "saving-piggy": {
    category: "Finance",
  },
  "saving-piggy-coin": {
    category: "Finance",
  },
  sawblade: {
    category: "Objects",
  },
  scissor: {
    category: "Objects",
  },
  search: {
    category: "Action & Interface",
  },
  send: {
    category: "Communication",
  },
  server: {
    category: "Network & Infrastructure",
  },
  "server-camera": {
    category: "Network & Infrastructure",
  },
  "server-connect": {
    category: "Network & Infrastructure",
  },
  "server-settings": {
    category: "Network & Infrastructure",
  },
  "server-upgrade": {
    category: "Network & Infrastructure",
  },
  "setting-search": {
    category: "Action & Interface",
  },
  settings: {
    category: "Action & Interface",
  },
  "share-android": {
    category: "Action & Interface",
  },
  "share-ios": {
    category: "Action & Interface",
  },
  "share-web": {
    category: "Action & Interface",
  },
  shield: {
    category: "Security & Protection",
  },
  "shield-user": {
    category: "People & User",
  },
  "shield-user-key": {
    category: "People & User",
  },
  ship: {
    category: "Transport & Travel",
  },
  sick: {
    category: "Health, Medicine & Hygiene",
  },
  "sidebar-arrow-left": {
    category: "Action & Interface",
  },
  "sidebar-arrow-right": {
    category: "Action & Interface",
  },
  siren: {
    category: "Security & Protection",
  },
  "smart-watch-circle": {
    category: "Devices & Electronics",
  },
  "smart-watch-square": {
    category: "Devices & Electronics",
  },
  smoking: {
    category: "Objects",
  },
  "smoking-disabled": {
    category: "Objects",
  },
  snowflake: {
    category: "Weather & Climate",
  },
  "soap-dispenser": {
    category: "Health, Medicine & Hygiene",
  },
  sort: {
    category: "Action & Interface",
  },
  spaces: {
    category: "Action & Interface",
  },
  speedometer: {
    category: "Car Parts",
  },
  "split-horizontal": {
    category: "Action & Interface",
  },
  "split-vertical": {
    category: "Action & Interface",
  },
  star: {
    category: "Various",
  },
  stopover: {
    category: "Navigation",
  },
  storage: {
    category: "Network & Infrastructure",
  },
  "storage-camera": {
    category: "Network & Infrastructure",
  },
  "storage-cloud": {
    category: "Network & Infrastructure",
  },
  "storage-connect": {
    category: "Network & Infrastructure",
  },
  "storage-settings": {
    category: "Network & Infrastructure",
  },
  "storage-shield": {
    category: "Network & Infrastructure",
  },
  store: {
    category: "Commerce & Shopping",
  },
  "store-display": {
    category: "Commerce & Shopping",
  },
  stroller: {
    category: "Objects",
  },
  subnet: {
    category: "Network & Infrastructure",
  },
  suitcase: {
    category: "Business & Statistics",
  },
  sunny: {
    category: "Weather & Climate",
  },
  support: {
    category: "Help & Support",
  },
  "switch-horizontal": {
    category: "Arrows",
  },
  "switch-vertical": {
    category: "Arrows",
  },
  sync: {
    category: "Arrows",
  },
  "tab-1": {
    category: "Devices & Electronics",
  },
  "tab-2": {
    category: "Devices & Electronics",
  },
  tag: {
    category: "Business & Statistics",
  },
  "tag-disabled": {
    category: "Business & Statistics",
  },
  "test-tube": {
    category: "Objects",
  },
  "text-selector": {
    category: "Tools & Shapes",
  },
  "thumbs-down": {
    category: "Cursor & Hands",
  },
  "thumbs-up": {
    category: "Cursor & Hands",
  },
  timer: {
    category: "Devices & Electronics",
  },
  tire: {
    category: "Car Parts",
  },
  "toggle-switch": {
    category: "Action & Interface",
  },
  "tool-anchor-point-minus": {
    category: "Tools & Shapes",
  },
  "tool-anchor-point-plus": {
    category: "Tools & Shapes",
  },
  "tool-circle": {
    category: "Tools & Shapes",
  },
  "tool-color-fill": {
    category: "Tools & Shapes",
  },
  "tool-crop": {
    category: "Tools & Shapes",
  },
  "tool-crop-2": {
    category: "Tools & Shapes",
  },
  "tool-curvature": {
    category: "Tools & Shapes",
  },
  "tool-elipse": {
    category: "Tools & Shapes",
  },
  "tool-expand-horizontally": {
    category: "Tools & Shapes",
  },
  "tool-expand-vertically": {
    category: "Tools & Shapes",
  },
  "tool-line": {
    category: "Tools & Shapes",
  },
  "tool-path-1": {
    category: "Tools & Shapes",
  },
  "tool-path-2": {
    category: "Tools & Shapes",
  },
  "tool-path-3": {
    category: "Tools & Shapes",
  },
  "tool-path-4": {
    category: "Tools & Shapes",
  },
  "tool-path-5": {
    category: "Tools & Shapes",
  },
  "tool-pencil": {
    category: "Tools & Shapes",
  },
  "tool-polygon": {
    category: "Tools & Shapes",
  },
  "tool-rectangle": {
    category: "Tools & Shapes",
  },
  "tool-ruler": {
    category: "Tools & Shapes",
  },
  "tool-scale": {
    category: "Tools & Shapes",
  },
  "tool-table": {
    category: "Tools & Shapes",
  },
  "tool-text": {
    category: "Tools & Shapes",
  },
  "tool-transform": {
    category: "Tools & Shapes",
  },
  "tool-underlined": {
    category: "Tools & Shapes",
  },
  "touch-hold": {
    category: "Cursor & Hands",
  },
  "touch-password": {
    category: "Cursor & Hands",
  },
  "touch-press": {
    category: "Cursor & Hands",
  },
  "touch-toggle-switch": {
    category: "Cursor & Hands",
  },
  tour: {
    category: "Transport & Travel",
  },
  "tour-plus": {
    category: "Transport & Travel",
  },
  "tour-x": {
    category: "Transport & Travel",
  },
  tram: {
    category: "Transport & Travel",
  },
  translate: {
    category: "Communication",
  },
  trash: {
    category: "Action & Interface",
  },
  "trash-disabled": {
    category: "Action & Interface",
  },
  tree: {
    category: "Weather & Climate",
  },
  "tree-2": {
    category: "Weather & Climate",
  },
  "triangle-warning": {
    category: "Essentials",
  },
  trolley: {
    category: "Business & Statistics",
  },
  truck: {
    category: "Business & Statistics",
  },
  undo: {
    category: "Arrows",
  },
  "unlocked-1": {
    category: "Security & Protection",
  },
  "unlocked-2": {
    category: "Security & Protection",
  },
  upgrade: {
    category: "Network & Infrastructure",
  },
  upload: {
    category: "Network & Infrastructure",
  },
  "upload-2": {
    category: "Network & Infrastructure",
  },
  user: {
    category: "People & User",
  },
  "user-arrow-down": {
    category: "People & User",
  },
  "user-arrow-up": {
    category: "People & User",
  },
  "user-block": {
    category: "People & User",
  },
  "user-check": {
    category: "People & User",
  },
  "user-circle-minus": {
    category: "People & User",
  },
  "user-clock": {
    category: "People & User",
  },
  "user-company-id": {
    category: "People & User",
  },
  "user-edit": {
    category: "People & User",
  },
  "user-group": {
    category: "People & User",
  },
  "user-id": {
    category: "People & User",
  },
  "user-key": {
    category: "People & User",
  },
  "user-location-pin": {
    category: "People & User",
  },
  "user-lock": {
    category: "People & User",
  },
  "user-message-minus": {
    category: "People & User",
  },
  "user-message-plus": {
    category: "People & User",
  },
  "user-minus": {
    category: "People & User",
  },
  "user-nametag": {
    category: "People & User",
  },
  "user-plus": {
    category: "People & User",
  },
  "user-settings": {
    category: "People & User",
  },
  "user-shield": {
    category: "People & User",
  },
  "user-suit-nametag": {
    category: "People & User",
  },
  "user-x": {
    category: "People & User",
  },
  vibration: {
    category: "Communication",
  },
  videocam: {
    category: "Devices & Electronics",
  },
  "videocam-disabled": {
    category: "Devices & Electronics",
  },
  virus: {
    category: "Health, Medicine & Hygiene",
  },
  "virus-shield": {
    category: "Health, Medicine & Hygiene",
  },
  "volume-disabled": {
    category: "Action & Interface",
  },
  "volume-down": {
    category: "Action & Interface",
  },
  "volume-mute": {
    category: "Action & Interface",
  },
  "volume-up": {
    category: "Action & Interface",
  },
  voucher: {
    category: "Commerce & Shopping",
  },
  walking: {
    category: "Transport & Travel",
  },
  wallet: {
    category: "Commerce & Shopping",
  },
  warehouse: {
    category: "Commerce & Shopping",
  },
  webhook: {
    category: "Software & Services",
  },
  windmill: {
    category: "Weather & Climate",
  },
  windows: {
    category: "Software & Services",
  },
  wlan: {
    category: "Connectivity",
  },
  wrench: {
    category: "Objects",
  },
  x: {
    category: "Essentials",
  },
  "x-small": {
    category: "Essentials",
  },
  "zoom-in": {
    category: "Action & Interface",
  },
  "zoom-out": {
    category: "Action & Interface",
  },
  "chevron-down-up": {
    category: "Arrows",
  },
  "kubernetes-lock": {
    category: "Software & Services",
  },
  "plus-minus": {
    category: "Essentials",
  },
  "server-lock": {
    category: "Network & Infrastructure",
  },
  new: {
    category: "Various",
  },
  "server-shield": {
    category: "Network & Infrastructure",
  },
  "kubernetes-shield": {
    category: "Software & Services",
  },
  "car-electric": {
    category: "Car Parts",
  },
  "circle-contrast": {
    category: "Action & Interface",
  },
  "search-x": {
    category: "Action & Interface",
  },
  "print-dots": {
    category: "Devices & Electronics",
  },
  "print-list": {
    category: "Devices & Electronics",
  },
  soccer: {
    category: "Objects",
  },
  "heptagon-cloud-lock": {
    category: "Software & Services",
  },
  "heptagon-cloud": {
    category: "Software & Services",
  },
  "heptagon-lock": {
    category: "Software & Services",
  },
} as const satisfies Record<string, IconMetadata>;

/**
 * Grouped metadata of all available icons by category.
 * Categories and icons will be sorted alphabetically.
 */
export const ICON_CATEGORIES = groupIconsByCategory(ICON_METADATA);

/**
 * Transform an icon name to its corresponding JavaScript import name.
 *
 * @example
 * ```ts
 * "bell-disabled" => "bellDisabled"
 * // e.g. used as 'import bellDisabled from "@sit-onyx/icons/bell-disabled.svg?raw"'
 * ```
 */
export const getIconImportName = (iconName: string) => {
  return iconName
    .split("-")
    .map((word, index) => {
      if (index === 0) return word;
      return capitalize(word);
    })
    .join("");
};

/**
 * Capitalizes the first character of the given string.
 */
const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
