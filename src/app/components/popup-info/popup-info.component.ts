import { CommonModule, NgSwitch } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RequestService } from '../../services/request.service';
import { environment } from '../../../environments/environmen';


@Component({
  selector: 'app-popup-info',
  standalone: true,
  imports: [FormsModule, NgSwitch, CommonModule ],
  templateUrl: './popup-info.component.html',
  styleUrl: './popup-info.component.css'
})
export class PopupInfoComponent {
  currentStep = 1; // Номер текущего шага
  userData: any = {
    name_or_nickname: '',
    gender: '',
    seeking: '',
    birthday: '',
    hometown: '',
    details: '',
    interests: [],
    avatar: null,
  };
  detail(){
    console.log(this.userData);
  }


  constructor(
    private req: RequestService,
  ){}

  ngOnInit(): void {
    // Инициализация Google API Client

  }



  countries: string[] = [
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Korea, North',
    'Korea, South',
    'Kosovo',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino','Sao Tome and Principe','Saudi Arabia','Senegal',
    'Serbia','Seychelles','Sierra Leone','Singapore',
    'Slovakia','Slovenia','Solomon Islands','Somalia',
    'South Africa','South Sudan','Spain','Sri Lanka',
    'Sudan','Suriname','Sweden','Switzerland',
    'Syria','Taiwan','Tajikistan','Tanzania',
    'Thailand','Timor-Leste','Togo','Tonga',
    'Trinidad and Tobago',  'Tunisia','Turkey',
    'Turkmenistan','Tuvalu','Uganda','Ukraine',
    'United Arab Emirates','United Kingdom','United States',
    'Uruguay','Uzbekistan','Vanuatu','Vatican City',
    'Venezuela','Vietnam','Yemen','Zambia','Zimbabwe'  ];

  interests: string[] = [
    'Lying on the beach',
    'Camping',
    'Dancing',
    'Fishing & Hunting',
    'Hockey',
    'Music & Concerts',
    'Sailing',
    'Travelling',
    'Biking',
    'Cars',
    'Diving',
    'Games',
    'Movies',
    'Nature',
    'Shopping',
    'Watch TV',
    'Reading books',
    'Cooking',
    'Fashion',
    'Hobbies & Crafts',
    'Museums & Arts',
    'Party & Night Club',
    'Sports',
    'Meditation & Yoga',
  ];

  // Переход к следующему шагу
  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  // Возврат к предыдущему шагу
  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Пропуск шага
  skipStep() {
    this.nextStep();
  }

  // Добавление или удаление интересов
  toggleInterest(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input);
    
    if (input.checked) {
      this.userData.interests.push(+input.id);
    } else {
      this.userData.interests = this.userData.interests.filter(
        (interest: string) => interest !== input.value
      );
    }
    console.log(this.userData.interests);
    
  }

  // Загрузка аватара
  // onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     this.userData.avatar = file;
  //     console.log('Selected file:', file);
  //   }
  // }

  // onFileSelected(event: Event) {
  //   const file = (event.target as HTMLInputElement).files?.[0];
  //   if (file) {
  //     this.userData.avatar = file;
  //     console.log('Selected file:', file);
      
  //     const formData = new FormData();
  //     formData.append('avatar', file);

  //     fetch('http://localhost:3000/upload/avatar', {
  //       method: 'POST',
  //       body: formData,
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('File uploaded successfully:', data);
  //     })
  //     .catch(error => {
  //       console.error('Error uploading file:', error);
  //     });
  //   }
  // }
  
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.userData.avatar = file;
      console.log('Выбранный файл:', file);
      
      // Создание FormData для отправки файла на сервер
      const formData = new FormData();
      formData.append('avatar', file); // Добавляем файл в FormData
  
      // Отправка файла на сервер
      fetch('http://localhost:3000/upload/avatar', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log('Файл успешно загружен:', data);
      })
      .catch(error => {
        console.error('Ошибка при загрузке файла:', error);
      });
    }
  }
  


  // Завершение
  finish() {
    console.log('User data:', this.userData);
    // Отправьте данные на сервер или сохраните локально
    let id = localStorage.getItem('userId')
    this.req.putData(environment.updateUserInfo.get + id, this.userData).subscribe(
      (response: any) => {
        console.log('Successfuly updated user information', response);
      },
      (error: any) => {
        console.log(error.error.error);
        
        console.log('Login failed', error);
        if (error.error) {
          console.log('Full error:', error.error);  
        }
        if (error.error.error === 'Invalid password') { 
        } else if (error.error.error === 'User not found'){
        } else {
          console.log('frgfg');
          
        }
      }
    );
  }
}
