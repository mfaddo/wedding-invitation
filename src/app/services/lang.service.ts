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
  familyLine: string;
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
}

const DICT: Record<Lang, Translation> = {
  ar: {
    introTitle: 'الدعوة',
    saveTheDate: 'احفظوا التاريخ',
    tapToOpen: 'اضغط للفتح',
    heroInvite: 'بكل حب وسرور ندعوكم لحضور حفل زفافنا',
    coupleNames: 'محمود فضو و مروة الملحم',
    groomName: 'محمود فضو',
    brideName: 'مروة الملحم',
    dateLine: 'الثلاثاء الموافق 11 أغسطس 2026',
    time: 'الساعة 7 مساءً',
    venue: 'قاعة مدينة نصر',
    address: 'مدينة نصر، القاهرة',
    mapBtn: 'عرض الموقع على الخريطة',
    verse:
      'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
    verseReference: 'سورة الروم - 21',
    familyLine: 'بمشيئة الله تعالى، تتشرف عائلتنا العروسين بدعوتكم لحضور حفل زفاف',
    dayLabel: 'يوم',
    dayName: 'الثلاثاء',
    dayNumber: '11',
    monthName: 'أغسطس',
    yearValue: '2026',
    hourLabel: 'الساعة',
    hourValue: '7 مساءً',
    countdownTitle: 'الوقت المتبقي للفرح',
    days: 'يوم',
    hours: 'ساعة',
    mins: 'دقيقة',
    secs: 'ثانية',
    galleryTitle: 'لحظاتنا',
    blessing:
      'بارك الله لهما وبارك عليهما وجمع بينهما في خير، نتطلع لرؤيتكم ومشاركتكم هذه المناسبة السعيدة',
    childrenNote: 'نأسف، لا يُسمح باصطحاب الأطفال في هذه المناسبة، دون استثناء.',
    noPhotoNote: 'حرصاً على راحة وخصوصية ضيوفنا، نرجو عدم استخدام كاميرات الهواتف أثناء الحفل.',
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
  },
  en: {
    introTitle: 'The Invitation',
    saveTheDate: 'Save the Date',
    tapToOpen: 'Tap to Open',
    heroInvite: 'With love and joy, we invite you to celebrate our wedding',
    coupleNames: 'Mahmoud Faddo & Marwa Al Melhem',
    groomName: 'Mahmoud Faddo',
    brideName: 'Marwa Al Melhem',
    dateLine: 'Tuesday, August 11, 2026',
    time: '7:00 PM',
    venue: 'Nasr City Hall',
    address: 'Nasr City, Cairo, Egypt',
    mapBtn: 'View location on map',
    verse:
      'And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them, and He placed between you love and mercy.',
    verseReference: 'Surah Ar-Rum — 21',
    familyLine: "God willing, our families are delighted to invite you to celebrate our wedding",
    dayLabel: 'Day',
    dayName: 'Tuesday',
    dayNumber: '11',
    monthName: 'August',
    yearValue: '2026',
    hourLabel: 'Time',
    hourValue: '7 P.M.',
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
