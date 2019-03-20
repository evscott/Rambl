import { library } from '@fortawesome/fontawesome-svg-core';
import {
  fas,
  faStar as faStar1,
  faStarHalfAlt,
  faBus,
  faHotel,
  faCalendarWeek,
  faPencilAlt,
  faCheck
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
    faPencilAlt,
    faCheck
  );
}
