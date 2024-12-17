import ProfileData from "./profileData";



interface TokenProps {
    token:string;
   
    updateProfileData?: (newData: Partial<ProfileData>) => void;
    profileData?:ProfileData
   
  }
  export default TokenProps