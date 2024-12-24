import { BookType } from '../types';

export const bookTypes: BookType[] = [
  {
    id: 'space-adventure',
    title: 'הרפתקה בחלל',
    description: 'הצטרפו למסע מרתק בחלל שבו ילדכם הופך לחוקר חלל אמיץ!',
    previewImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80',
    ageRange: '4-8'
  },
  {
    id: 'magical-forest',
    title: 'היער הקסום',
    description: 'גלו יצורים מכושפים ותעלומות קסומות בהרפתקה ביער מופלא.',
    previewImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1887&auto=format&fit=crop&q=80',
    ageRange: '3-7'
  },
  {
    id: 'underwater-quest',
    title: 'הרפתקה מתחת למים',
    description: 'צללו לעולם תת-ימי מדהים מלא ביצורי ים ידידותיים ואוצרות נסתרים.',
    previewImage: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80',
    ageRange: '5-9'
  }
];