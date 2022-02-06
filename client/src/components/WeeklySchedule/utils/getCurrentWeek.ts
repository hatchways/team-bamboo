import moment from 'moment';
const getCurrentWeek = (): Array<string> => {
  const currentDate = moment();
  const currWeek = [];
  const weekStart = currentDate.clone().startOf('isoWeek');
  for (let i = 0; i < 7; i++) {
    currWeek.push(moment(weekStart).add(i, 'days').format('dddd, D MMMM'));
  }
  return currWeek;
};

export default getCurrentWeek;
