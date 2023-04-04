import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  getData() {
    // return [
    //   { name: 'Tìm kiếm khách hàng mới', code: '' },
    //   { name: 'Giải đáp thắc mắc của khách hàng', code: '' },
    //   { name: 'Tư vấn sản phẩm/dịch vụ', code: '' },
    //   { name: 'Giữ liên lạc với khách hàng hiện tại và quản lý hồ sơ khách hàng. ', code: '' },
    //   { name: 'Theo dõi các giao dịch tài chính', code: '' },
    //   { name: 'Quản lý sổ sách, thực hiện các báo cáo tài chính', code: '' },
    //   { name: 'Chuẩn bị thuế', code: '' },
    //   { name: 'Đảm bảo tuân thủ các quy định về thuế.', code: '' },
    //   { name: 'Tuyển dụng', code: '' },
    //   { name: 'Đào tạo', code: '' },
    //   { name: 'Đánh giá và quản lý nhân viên', code: '' },
    //   { name: 'Xây dựng chính sách và quy trình của công ty liên quan đến nhân sự', code: '' },
    //   { name: 'Đảm bảo tuân thủ các quy định pháp luật về lao động', code: '' },
    //   { name: 'Thiết kế', code: '' },
    //   { name: 'Triển khai và đánh giá các chiến dịch quảng cáo và tiếp thị', code: '' },
    //   { name: 'Phân tích thị trường và nghiên cứu khách hàng', code: '' },
    //   { name: 'phát triển các chiến lược tiếp thị mới và tăng doanh số bán hàng', code: '' },
    //   { name: 'Phát triển', code: '' },
    //   { name: 'Thử nghiệm và bảo trì các ứng dụng phần mềm', code: '' },
    //   { name: 'Thiết kế các hệ thống phần mềm', code: '' },
    //   { name: 'Giải quyết các vấn đề kỹ thuật liên quan đến phần mềm', code: '' },
    //   { name: 'Phát triển và thiết kế ứng dụng phần mềm', code: '' },
    //   { name: 'Tạo ra các trang web và cải thiện các tính năng', code: '' },
    //   { name: 'Giao diện của các sản phẩm', code: '' },
    //   { name: 'Thiết kế các hình ảnh', code: '' },
    //   { name: 'Thiết kế đồ họa', code: '' },
    //   { name: 'Thiết kế qảng quảng cáo cho các doanh nghiệp,', code: '' },
    //   { name: 'Thiết kế sự kiện và tổ chức', code: '' },
    //   { name: 'Viết các bài viết', code: '' },
    //   { name: 'truyện ngắn', code: '' },
    //   { name: 'tiểu thuyết', code: '' },
    //   { name: 'tài liệu kỹ thuật', code: '' },
    //   { name: 'Nội dung trang web cho khách hàng', code: '' },
    //   { name: 'Tư vấn khách hàng về các vấn đề tài chính như đầu tư', code: '' },
    //   { name: 'Tư vấn khách hàng về các vấn đề tài tiết kiệm', code: '' },
    //   { name: 'Tư vấn khách hàng quản lý nợ', code: '' },
    //   { name: 'Tư vấn khách hàng lập kế hoạch tài chính', code: '' },
    //   { name: 'Tư vấn khách hàng bảo hiểm', code: '' },
    // ];

    return [
      'Tìm kiếm khách hàng mới',
      'Giải đáp thắc mắc của khách hàng',
      'Tư vấn sản phẩm/dịch vụ',
      'Giữ liên lạc với khách hàng hiện tại và quản lý hồ sơ khách hàng. ',
      'Theo dõi các giao dịch tài chính',
      'Quản lý sổ sách, thực hiện các báo cáo tài chính',
      'Chuẩn bị thuế',
      'Đảm bảo tuân thủ các quy định về thuế.',
      'Tuyển dụng',
      'Đào tạo',
      'Đánh giá và quản lý nhân viên',
      'Xây dựng chính sách và quy trình của công ty liên quan đến nhân sự',
      'Đảm bảo tuân thủ các quy định pháp luật về lao động',
      'Thiết kế',
      'Triển khai và đánh giá các chiến dịch quảng cáo và tiếp thị',
      'Phân tích thị trường và nghiên cứu khách hàng',
      'phát triển các chiến lược tiếp thị mới và tăng doanh số bán hàng',
      'Phát triển',
      'Thử nghiệm và bảo trì các ứng dụng phần mềm',
      'Thiết kế các hệ thống phần mềm',
      'Giải quyết các vấn đề kỹ thuật liên quan đến phần mềm',
      'Phát triển và thiết kế ứng dụng phần mềm',
      'Tạo ra các trang web và cải thiện các tính năng',
      'Giao diện của các sản phẩm',
      'Thiết kế các hình ảnh',
      'Thiết kế đồ họa',
      'Thiết kế qảng quảng cáo cho các doanh nghiệp,',
      'Thiết kế sự kiện và tổ chức',
      'Viết các bài viết',
      'Truyện ngắn',
      'Tiểu thuyết',
      'Tài liệu kỹ thuật',
      'Nội dung trang web cho khách hàng',
      'Tư vấn khách hàng về các vấn đề tài chính như đầu tư',
      'Tư vấn khách hàng về các vấn đề tài tiết kiệm',
      'Tư vấn khách hàng quản lý nợ',
      'Tư vấn khách hàng lập kế hoạch tài chính',
      'Tư vấn khách hàng bảo hiểm',
    ];
  }


  getTitles() {
    return Promise.resolve(this.getData());
  }

  constructor() { }
}
