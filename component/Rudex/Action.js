import Add_User_To_Localstorage from './containts'


export function add_user_to_localstorage(item)
{
    return{
        type:"Add_User_To_Localstorage",
        data:item
    }
}
