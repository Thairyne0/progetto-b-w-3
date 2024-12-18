import ProfileData from "./profileData";



interface TokenProps {
    token:string|null;
   
    updateProfileData?: (newData: Partial<ProfileData>) => void;
    profileData?:ProfileData
   
  }
  export default TokenProps