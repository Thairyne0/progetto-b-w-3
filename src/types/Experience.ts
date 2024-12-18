interface IExperience{
    role: string;
    company: string;
    startDate: string;
    endDate: string | null;
    description: string;
    area: string;
    username: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    _id: string;
    hybrid: boolean
  }
  export default IExperience