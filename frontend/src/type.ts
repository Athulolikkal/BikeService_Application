export interface ServiceType {
  _id?: string;
  servicename?: string;
  rate?: string;
  details?: string;
  status?: string;
}

export interface BookingType {
  _id?: string;
  userName?: string;
  userId?: string;
  status?: string;
  serviceRate?: string;
  serviceName?: string;
  serviceId?: string;
  email?: string;
  date?: string;
}

export interface StoreType {
  userInfo?: {
    userId?: string;
    userName?: string;
    email?: string;
    phone?: string;
  };
}
