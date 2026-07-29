import { Injectable, computed, signal } from '@angular/core';

export type Lang = 'ar' | 'en';

export interface Translation {
  introTitle: string;
  saveTheDate: string;
  tapToOpen: string;
  heroInvite: string;
  coupleNames: string;
  groomName: string;
  brideName: string;
  dateLine: string;
  time: string;
  venue: string;
  address: string;
  mapBtn: string;
  verse: string;
  verseReference: string;
  dateIntro: string;
  dayLabel: string;
  dayName: string;
  dayNumber: string;
  monthName: string;
  yearValue: string;
  hourLabel: string;
  hourValue: string;
  countdownTitle: string;
  days: string;
  hours: string;
  mins: string;
  secs: string;
  galleryTitle: string;
  blessing: string;
  childrenNote: string;
  noPhotoNote: string;
  location: string;
  locationName: string;
  locationAddress: string;
  rsvpTitle: string;
  nameLabel: string;
  attendingLabel: string;
  yes: string;
  no: string;
  guestsLabel: string;
  submit: string;
  thankYou: string;
  rsvpFloat: string;
  playLabel: string;
  pauseLabel: string;
  weddingDay: string;
  scrollDown: string;
  invitationText: string;
}

const DICT: Record<Lang, Translation> = {
  ar: {
    introTitle: 'الدعوة',
    saveTheDate: 'م  م',
    tapToOpen: 'اضغط للفتح',
    heroInvite: 'بكل حب وسرور ندعوكم لحضور حفل زفافنا',
    coupleNames: 'زار الفرح دارنا',
    groomName: 'محمود',
    brideName: 'مروة',
    dateLine: 'بكل الحب والامتنان، ندعوكم لتشهدوا بداية فصلٍ جديد من حياتنا',
    time: 'الساعة 7 مساءً',
    venue: 'قاعات قصر الاميرات',
    address: 'قاعة سندريلا , مدينة نصر',
    mapBtn: 'عرض الموقع على الخريطة',
    verse:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    verseReference: 'سورة الروم - 21',
    dateIntro: 'لحظات الفرح اختارت من عمرنا موعداََ',
    dayLabel: 'يوم',
    dayName: 'الثلاثاء',
    dayNumber: '11',
    monthName: 'أغسطس',
    yearValue: '2026',
    hourLabel: 'الساعة',
    hourValue: '7:30 م',
    countdownTitle: 'الوقت المتبقي للزفاف',
    days: 'يوم',
    hours: 'ساعة',
    mins: 'دقيقة',
    secs: 'ثانية',
    galleryTitle: 'لحظاتنا',
    blessing:
      'بارك الله لهما وبارك عليهما وجمع بينهما في خير، نتطلع لرؤيتكم ومشاركتكم هذه المناسبة السعيدة',
    childrenNote: 'نأسف، لا يُسمح باصطحاب الأطفال في هذه المناسبة، دون استثناء.',
    noPhotoNote: 'حرصاً على راحة وخصوصية ضيوفنا، نرجو عدم استخدام كاميرات الهواتف أثناء الحفل.',
    location: 'الموقع',
    locationName: 'قاعات قصر الاميرات , قاعة سندريلا',
    locationAddress: 'مدينة نصر - الحي السابع - داخل حديقة العاشر من رمضان ( قاعات قصر الاميرات) قاعة سندريلا',
    rsvpTitle: 'تأكيد الحضور',
    nameLabel: 'الاسم',
    attendingLabel: 'هل ستحضر؟',
    yes: 'نعم، بكل سرور',
    no: 'عذراً، لا أستطيع',
    guestsLabel: 'عدد الحضور',
    submit: 'إرسال',
    thankYou: 'شكراً لتأكيدكم، بانتظاركم بفارغ الصبر!',
    rsvpFloat: 'تأكيد الحضور',
    playLabel: 'تشغيل',
    pauseLabel: 'إيقاف مؤقت',
    weddingDay: 'دعوة الزفاف',
    scrollDown: 'اسحب لأسفل',
    invitationText: 'بكل الحب والامتنان، ندعوكم لتشهدوا بداية فصلٍ جديد من حياتنا',
  },
  en: {
    introTitle: 'The Invitation',
    saveTheDate: 'M&M',
    tapToOpen: 'Tap to Open',
    heroInvite: 'With love and joy, we invite you to celebrate our wedding',
    coupleNames: 'Joy has graced our home',
    groomName: 'Mahmoud Faddo',
    brideName: 'Marwa Al Melhem',
    dateLine: 'Tuesday, August 11, 2026',
    time: '7:00 PM',
    venue: 'Princess Palace Halls',
    address: 'Cinderella Hall, Nasr City',
    mapBtn: 'View location on map',
    verse:
      'And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them, and He placed between you love and mercy.',
    verseReference: 'Surah Ar-Rum — 21',
    dateIntro: 'Moments of joy have chosen a time from our lives',
    dayLabel: 'Day',
    dayName: 'Tuesday',
    dayNumber: '11',
    monthName: 'August',
    yearValue: '2026',
    hourLabel: 'Time',
    hourValue: '7:30 P.M.',
    countdownTitle: 'Counting down to our big day',
    days: 'Days',
    hours: 'Hours',
    mins: 'Min',
    secs: 'Sec',
    galleryTitle: 'Our Moments',
    blessing:
      'May God bless them and unite them in goodness. We look forward to celebrating this joyous occasion with you.',
    childrenNote: 'We kindly ask that children not attend this event, without exception.',
    noPhotoNote:
      'For the comfort and privacy of our guests, please refrain from using phone cameras during the ceremony.',
    location: 'Location',
    locationName: 'Princess Palace Halls, Cinderella Hall',
    locationAddress: 'Nasr City - Seventh District - Inside Ramadan 10th Garden (Princess Palace Halls) Cinderella Hall',
    rsvpTitle: 'RSVP',
    nameLabel: 'Your name',
    attendingLabel: 'Will you attend?',
    yes: 'Joyfully accept',
    no: 'Regretfully decline',
    guestsLabel: 'Number of guests',
    submit: 'Submit',
    thankYou: "Thank you for your response — we can't wait to celebrate with you!",
    rsvpFloat: 'RSVP',
    playLabel: 'Play',
    pauseLabel: 'Pause',
    weddingDay: 'Wedding Day',
    scrollDown: 'Scroll down',
    invitationText: 'With all our love and gratitude, we invite you to witness the beginning of a new chapter in our lives',
  },
};

@Injectable({ providedIn: 'root' })
export class LangService {
  readonly lang = signal<Lang>('ar');

  readonly isRtl = computed(() => this.lang() === 'ar');
  readonly dir = computed<'rtl' | 'ltr'>(() => (this.isRtl() ? 'rtl' : 'ltr'));
  readonly t = computed<Translation>(() => DICT[this.lang()]);

  readonly fontHeading = computed(() =>
    this.isRtl() ? "'Aref Ruqaa', serif" : "'Cormorant Garamond', serif"
  );
  readonly headingStyle = computed<'normal' | 'italic'>(() =>
    this.isRtl() ? 'normal' : 'italic'
  );
  readonly fontBody = computed(() => (this.isRtl() ? "'Cairo', sans-serif" : "'Poppins', sans-serif"));
  readonly fontNames = computed(() =>
    this.isRtl() ? "'Aref Ruqaa', serif" : "'Great Vibes', cursive"
  );

  readonly toggleLabel = computed(() => (this.isRtl() ? 'EN' : 'ع'));
  readonly cornerSide = computed<'left' | 'right'>(() => (this.isRtl() ? 'left' : 'right'));

  toggle(): void {
    this.lang.update((l) => (l === 'ar' ? 'en' : 'ar'));
  }
}
