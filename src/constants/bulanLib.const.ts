const dataBulanSingkat = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des'
];

const dataBulanPanjang = [
  'Januari',
  'Febuari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember'
];

const BulanLib = (value = 0, isLong = false) => {
  return !isLong ? dataBulanSingkat[value] : dataBulanPanjang[value];
};

const BulanLibFromDate = (value: string, isLong:boolean = true) => {
  const date = new Date(value);
  return `${date.getDate()} ${BulanLib(date.getMonth(), isLong)} ${date.getFullYear()}`;
};

export {
  BulanLib,
  BulanLibFromDate,
};

