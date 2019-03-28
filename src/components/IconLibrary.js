import { library } from '@fortawesome/fontawesome-svg-core';
import {
  fas,
  faStar as faStar1,
  faStarHalfAlt,
  faBus,
  faHotel,
  faCalendarWeek,
  faPlusSquare,
  faPencilAlt,
  faCheck,
  faGrinBeam,
  faGrinWink,
  faGrinTongue,
  faGrinTongueSquint,
  faGrinTongueWink,
  faLaughBeam,
  faGrinStars,
  faGrin,
  faLaughWink,
  faLaugh
} from '@fortawesome/free-solid-svg-icons';
import { far, faStar as faStar2 } from '@fortawesome/free-regular-svg-icons';

export function createIconLibrary() {
  library.add(
    fas,
    far,
    faStar1,
    faStar2,
    faStarHalfAlt,
    faBus,
    faHotel,
    faCalendarWeek,
    faPlusSquare,
    faPencilAlt,
    faCheck,
    faGrinBeam,
    faGrinWink,
    faGrinTongue,
    faGrinTongueSquint,
    faGrinTongueWink,
    faLaughBeam,
    faGrinStars,
    faGrin,
    faLaughWink,
    faLaugh
  );
}
