import UploadsModel from '../model/uploads.model';

class UploadsService {
  
  constructor(private model: UploadsModel) {}

  async registerCurriculum (pathString: string, id: number) {    
    const removedPath = pathString.split('uploads/curriculum/')[1];
    const result = await this.model.registerCurriculum(removedPath, id);
    return result;
  }
}

export default UploadsService;