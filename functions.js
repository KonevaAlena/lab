
localStorage.debitors = JSON.stringify(Array());


function calculation(summ, month) { //// Обработка полей калькулятора и расчет платежа
    //summ = +document.querySelector("#summ").value;
    //month = document.querySelector("#month").value;
    //document.querySelector("#mv").innerHTML = month;
    //document.querySelector("#sv").innerHTML = summ.toLocaleString() + " рублей";
    return Math.round(summ / month + summ * 0.07 / month);
    //document.querySelector("#result").innerHTML = Math.round(form.result).toLocaleString() + " рублей";
  }

  function addcredit(newForm) { /// Запись данных в базу о выдааче кредитта
    if (!localStorage.debitors) {
      localStorage.debitors = JSON.stringify([]);
      debitors = [];
    };

    var form = Object();
    var spisok = JSON.parse(localStorage.debitors);
    var id = 1;
    spisok.forEach(element => {
      console.log("kd=" + element.kd);
      if (element.kd >= id) id = element.kd + 1;  //технически здесь if не нужен (так как если список(localStorage.debitos) пустой то цикл даже не начнется, функция просто пропустит этот этап)
    });
    form.name = newForm.name;
    form.address = newForm.address;
    form.tel = newForm.tel;
    form.kl = newForm.kl;
    form.month = newForm.month;
    form.summ = newForm.summ;
    form.kd = id;
    spisok.push(form);
    localStorage.debitors = JSON.stringify(spisok);
    return form;
    // document.querySelector("#container").innerHTML = document.querySelector('#credok').innerHTML;
    // document.forms.credit.name.value = "";
    // document.forms.credit.address.value = "";
    // document.forms.credit.tel.value = "";
    // document.forms.credit.kl.value = "";
    // document.forms.credit.month.value = 12;
    // document.forms.credit.summ.value = 50000;
}


function deblist() { /// вывод списка должников
    //if (!localStorage.token) { auth(); return; }
    if (JSON.parse(localStorage.debitors).length < 1) {
      //document.querySelector("#container").innerHTML = "<div>Должников еще нет.</div>";
      return -1;
    }
    var spisok = JSON.parse(localStorage.debitors);
    //html = "<div>Всего должников:" + spisok.length + "<table><thead><td>Номер договора</td><td>Название</td><td>Телефон</td><td>Адрес</td><td>Контактное лицо</td><td>Сумма займа</td><td>Срок займа (месяцев)</td><td>Ежемесячный платеж</td></thead><tbody>";
    // spisok.forEach(element => {
    //   html += "<tr><td>" + element.kd + "</td><td>" + element.name + "</td><td>" + element.tel + "</td><td>" + element.address + "</td><td>" + element.kl + "</td><td>" + element.summ.toLocaleString() + "</td><td>" + element.month + "</td><td>" + element.result.toLocaleString() + "</td></tr>";
    // });

    //html += "</tbody></table>";
    //document.querySelector("#container").innerHTML = html;
    return spisok;
  }

  function addpayment(id, summ) { /// сохранение платежа и вычитание у должника
    if (id == null || summ == null) return -1;
    if (JSON.parse(localStorage.debitors).length < 1) {
      //document.querySelector("#container").innerHTML = "<div>Кредиты еще не выданы.</div>";
      return -1;
    }

    var spisok = JSON.parse(localStorage.debitors); // получаем массив должник из базы данных
    var find = null;
    console.log(spisok);
    Object.keys(spisok).forEach((key) => { // перебираем построчно список
      if (spisok[key].kd == id) { // если номер договора из списка совпал с номером из формы платежа
        find = spisok[key];
        spisok[key].summ -= summ;//вычитааем из суммы долга этого должника сумму платежа 
        if (spisok[key].summ <= 0) spisok[key].summ = 0; // если сумма платежа больше чем сумма долга то показыываем что он должен 0 а не значение с минусом
      }

    });

    localStorage.debitors = JSON.stringify(spisok);
    return find;
  }

  function loginin(login, password) {
    var   managers = [
        ["Иванов Иван Иванович", "IvIvIv", "890098"],
        ["Петров Петр Петрович", "PePePe", "123321"],
        ["Сидоров Сидор Сидорович", "SiSiSi", "567765"]
      ];
    var check = false;  
    managers.forEach(element => {
      console.log(element);

      if (login == element[1] && password == element[2]) {   
        //localStorage.token = JSON.stringify(element);
        // document.querySelector("#man").innerHTML = "авторизован менеджер<br>"+JSON.parse(localStorage.token)[0];
        // document.querySelector("#container").innerHTML = "<div>Авторизация прошла успешно</div>";
        // document.querySelector('#menu').style.display = "flex";
        // add();
        check = true;
      }
    });
    return check;
  }