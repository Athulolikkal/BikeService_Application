//when user signup then all the datas  that we are storing in data base at the inital stage comes as object and and setting function to return data

export default function user(userInfo) {
    return {
        getUserName: () => userInfo?.name,
        getUserEmail: () => userInfo?.email,
        getUserPhone: () => userInfo?.phonenumber,
        getUserPassword: () => userInfo?.hashedPassword
    }
}