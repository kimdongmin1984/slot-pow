import Moment from "moment";

function pad(number: any, length: any) {
  let str = `${number}`;
  while (str.length < length) {
    str = `0${str}`;
  }

  return str;
}
export const ConvertTime = (date: any): any => {
  const today = new Date(date);

  const hh = pad(today.getHours(), 2);
  const mm = pad(today.getMinutes(), 2);
  return `${hh}:${mm}`;
};

export const ConverStatus = (status: string): any => {
  if (status === "win") {
    return "실현";
  } else if (status === "lose") {
    return "실격";
  } else if (status === "reg") {
    return "대기";
  }

  return "-";
};

export const ConvertBalanceStateToText = (status: any) => {
  if (status === "wait") return "대기";
  if (status === "reg") return "대기";
  if (status === "already") return "완료";
  if (status === "cansel") return "취소";
  return "-";
};
export const ConverBuySell = (status: string): any => {
  if (status === "high") {
    return "매수";
  } else if (status === "low") {
    return "매도";
  }

  return "-";
};

export const HelpStatus = (status: any) => {
  if (status === "wait") return "대기";
  if (status === "reg") return "대기";
  if (status === "already") return "완료";
  if (status === "cansel") return "취소";

  return status;
};

export const ConverMoeny = (balance: Number): any => {
  return Number(balance).toLocaleString();
};

export const ConvertDate = (dt: any) => {
  return Moment(dt).format("MM-DD HH:mm");
};

export const ConvertDate2 = (dt: any) => {
  return Moment(dt).format("MM-DD HH:mm:ss");
};

export const GetTimeStemp = () => {
  return new Date().getTime();
};
