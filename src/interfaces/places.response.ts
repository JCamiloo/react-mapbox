export interface PlacesResponse {
  type:        string;
  query:       string[];
  features:    Feature[];
  attribution: string;
}

export interface Feature {
  id:            string;
  type:          string;
  place_type:    string[];
  relevance:     number;
  properties:    Properties;
  text_es:       string;
  place_name_es: string;
  text:          string;
  place_name:    string;
  center:        number[];
  geometry:      Geometry;
  context:       Context[];
}

interface Context {
  id:           string;
  text_es:      string;
  text:         string;
  short_code?:  ShortCode;
  wikidata?:    Wikidata;
  language_es?: Language;
  language?:    Language;
}

enum Language {
  Es = "es",
}

enum ShortCode {
  Co = "co",
  CoQui = "CO-QUI",
  CoVac = "CO-VAC",
}

enum Wikidata {
  Q13990 = "Q13990",
  Q13995 = "Q13995",
  Q739 = "Q739",
}

interface Geometry {
  coordinates: number[];
  type:        string;
}

interface Properties {
  foursquare: string;
  landmark:   boolean;
  category:   string;
  maki?:      string;
  address?:   string;
}
