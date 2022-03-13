export interface DirectionsResponse {
  routes:    Route[];
  waypoints: Waypoint[];
  code:      string;
  uuid:      string;
}

export interface Route {
  weight_name: string;
  weight:      number;
  duration:    number;
  distance:    number;
  legs:        Leg[];
  geometry:    Geometry;
}

interface Geometry {
  coordinates: Array<number[]>;
  type:        Type;
}

enum Type {
  LineString = "LineString",
}

interface Leg {
  via_waypoints: any[];
  admins:        Admin[];
  weight:        number;
  duration:      number;
  steps:         Step[];
  distance:      number;
  summary:       string;
}

interface Admin {
  iso_3166_1_alpha3: string;
  iso_3166_1:        string;
}

interface Step {
  intersections: Intersection[];
  maneuver:      Maneuver;
  name:          string;
  duration:      number;
  distance:      number;
  driving_side:  DrivingSide;
  weight:        number;
  mode:          Mode;
  geometry:      Geometry;
}

enum DrivingSide {
  Left = "left",
  Right = "right",
  Straight = "straight",
}

interface Intersection {
  entry:              boolean[];
  bearings:           number[];
  duration?:          number;
  mapbox_streets_v8?: MapboxStreetsV8;
  is_urban?:          boolean;
  admin_index:        number;
  out?:               number;
  weight?:            number;
  geometry_index:     number;
  location:           number[];
  in?:                number;
  turn_weight?:       number;
  turn_duration?:     number;
  lanes?:             Lane[];
}

interface Lane {
  indications:       DrivingSide[];
  valid_indication?: DrivingSide;
  valid:             boolean;
  active:            boolean;
}

interface MapboxStreetsV8 {
  class: Class;
}

enum Class {
  Primary = "primary",
  Secondary = "secondary",
  Street = "street",
}

interface Maneuver {
  type:           string;
  instruction:    string;
  bearing_after:  number;
  bearing_before: number;
  location:       number[];
  modifier?:      DrivingSide;
}

enum Mode {
  Driving = "driving",
}

interface Waypoint {
  distance: number;
  name:     string;
  location: number[];
}
