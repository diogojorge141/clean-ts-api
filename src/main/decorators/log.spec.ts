import { Controller, HttpRequest, HttpResponse } from "../../presentation/protocols";
import { LogControllerDecorator } from "./log";

interface SutTypes{
  controllerStub:Controller
  sut:LogControllerDecorator
}

const makeController = ():Controller=>{
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse = {
        statusCode: 200,
        body: {
          name: 'Diogo'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

const makeSut = ():SutTypes => {
  
  const controllerStub = makeController();
  const sut = new LogControllerDecorator(controllerStub);

  return{
    controllerStub,
    sut
  }

}


describe('LogController Decorator', () => {
  test('Should call controller handle ', async () => {
    const {sut,controllerStub} = makeSut()
    const handleSpy = jest.spyOn(controllerStub,'handle')
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})