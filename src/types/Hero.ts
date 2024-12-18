import ProfileData from "./profileData";



interface TokenProps {
    token:string|null;
   
    updateProfileData?: (newData: Partial<ProfileData>) => void;
    profileData?:ProfileData
    handleAlert?:(status:boolean)=>void
   
   
  }
  export default TokenProps