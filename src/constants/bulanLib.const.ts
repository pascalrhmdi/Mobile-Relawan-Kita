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

const dataHariPanjang = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu'
];

const BulanLib = (value = 0, isLong = false) => {
  return !isLong ? dataBulanSingkat[value] : dataBulanPanjang[value];
};

const BulanLibFromDate = (value: string, isLong:boolean = true) => {
  const date = new Date(value);
  return `${date.getDate()} ${BulanLib(date.getMonth(), isLong)} ${date.getFullYear()}`;
};

const HariLibFromDate = (value: string)=>{
  const date = new Date(value);
  return dataHariPanjang[date.getDay()];
};

export {
  BulanLib,
  BulanLibFromDate,
  HariLibFromDate
};

