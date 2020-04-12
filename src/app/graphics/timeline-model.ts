export interface TimelineData {
  title?: SlideObject;
  events: SlideObject[];
  eras?: Era[];
}

export interface Media {
  url: string;
  caption: string;
  credit: string;
}

export interface Text {
  headline: string;
  text: string;
}

export interface SlideObject {
  media?: Media;
  start_date?: TimelineDate;
  text: Text;
  group?: string;
}

export interface TimelineDate {
  year: string;
  month?: string;
  day?: string;
}

export interface Era {
  start_date: TimelineDate,
  end_date: TimelineDate,
  text?: string;
}
