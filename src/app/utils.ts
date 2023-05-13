import moment from "moment";

export const getTime = (timestamp: number) => moment(new Date(timestamp*1000)).format('HH:mm');