
const weddingData = {
  // COUPLE DETAILS
  couple: {
    groom: "Daniel Martin",
    bride: "Grace Mary",

    // These are invitation design templates, NOT couple photographs
    template: "/images/couple.jpg",
    introTemplate: "/images/intro.jpg",
  },

  // CHRISTIAN BIBLE VERSE
  bibleVerse: {
    text: "Therefore what God has joined together, let no one separate.",
    reference: "Mark 10:9",
  },

  // WEDDING CEREMONY
  wedding: {
    title: "Wedding Ceremony",
    day: "Thursday",
    date: "18 February 2027",
    dateISO: "2027-02-18",
    time: "10:30 AM onwards",

    venue: "St. Mary's Church",
    address: "Banjara Hills, Hyderabad, Telangana",

    image: "/images/venue.jpg",
  },

  // WEDDING RECEPTION
  reception: {
    title: "Wedding Reception",
    day: "Thursday",
    date: "18 February 2027",
    dateISO: "2027-02-18",
    time: "1:00 PM onwards",

    venue: "The Grand Palace",
    address: "Jubilee Hills, Hyderabad, Telangana",

    image: "/images/reception.jpg",
  },

  // OPENING SCENE
  opening: {
    closedDoors: "/images/closed-doors.jpg",
    openedDoors: "/images/opened-doors.jpg",
    dove: "/images/dove.png",
  },

  // INVITATION TEMPLATES
  invitation: {
    image: "/images/wedding.jpg",
    dateImage: "/images/date.jpg",
    rsvpImage: "/images/rsvp.jpg",
  },

  // BACKGROUND MUSIC
  music: {
    background: "/audio/wedding-music.mp3",
    autoplay: false,
    loop: true,
  },

  // COUNTDOWN
  countdown: {
    targetDate: "2027-02-18T10:30:00+05:30",
    title: "The Countdown Begins",
    subtitle: "Until We Become One",
  },

  // SCRATCH-TO-REVEAL SETTINGS
  scratch: {
    title: "A Little Surprise for You",
    subtitle: "Scratch to reveal a special blessing",
    revealText:
      "May the Lord bless your journey together with endless love, faith and happiness.",
    coverText: "Scratch Here",
  },

  // WISHES AND BLESSINGS SECTION
  // No attendance questions or yes/no options
  rsvp: {
    heading: "Share Your Love",
    subtitle:
      "Your love, prayers and blessings mean so much to us as we begin this beautiful journey.",

    nameLabel: "Your Name",
    namePlaceholder: "Enter your name",

    messageLabel: "Your Wishes & Blessings",
    messagePlaceholder:
      "Write something beautiful for the couple...",

    buttonText: "Send Your Blessings ❤️",

    allowAttendance: false,
    allowDecline: false,
  },

  // FINAL INVITATION SCENE
  finalMessage: {
    heading: "A Celebration Made Beautiful With You!",
    message:
      "We look forward to sharing this beautiful beginning with our family and friends. Your love and blessings will make our day even more special.",

    downloadText: "Download Wedding Invitation",
    downloadFile: "/wedding.pdf",
  },
};

export default weddingData;
