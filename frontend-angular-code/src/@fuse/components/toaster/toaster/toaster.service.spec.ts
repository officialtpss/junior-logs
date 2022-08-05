import { TestBed } from '@angular/core/testing';
import { ToasterService } from './toaster.service';


describe('ToasterService', () => {
    let service: ToasterService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ToasterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
    it('should call show and update subject', () => {
        let mockEvent: any = {
            body: "Location created successfully",
            delay: undefined,
            title: "Success",
            type: "success",
        }
        service.show(mockEvent.type, mockEvent.title, mockEvent.body);
        service.subject.subscribe((res: any) => {
            expect(res).toEqual(mockEvent);

        })

    });
    it('should call show and update subject', () => {
        let mockEvent: any = {
            body: "Location created successfully",
            delay: undefined,
            title: "Success",
            type: "success",
        };
        service.subject.next(mockEvent);
        service.toast$ = service.subject;
        service.toast$.subscribe((res: any) => {

            expect(res).toEqual(mockEvent);

        })

    });
});
