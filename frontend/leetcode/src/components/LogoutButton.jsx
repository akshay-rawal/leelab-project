import { useAuthStore } from "../store/store";




export const LogoutButton = (children)=>{
    const {logout} = useAuthStore()


    const onLogout = async ()=>{
              logout()
    }


    return(
        <div className="btn btn-primary" onClick={onLogout}>
     {children}
        </div>
    )
}