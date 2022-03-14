// const a = require('./functions');

const chai = window.chai;
const expect = chai.expect;


describe('calculation',function() {
    it('Функция должна правильно просчитать ежемесячный платеж в зависимости от суммы займа и количества месяцев оплаты со ставкой 7%', () => {
        expect(calculation(400000, 12)).equal(35667);
        expect(calculation(500000, 24)).equal(22292);
        expect(calculation(1000000,48)).equal(22292);
        expect(calculation(1570000,48)).equal(34998);
        expect(calculation(2640000,131)).equal(21563);
    })
})

describe('addcredit',function(){
    it('Функция должна добавлять данные о кредиторе в локальное хранилище',()=>{
        var newForm = {
            name:'test1',
            address:'test1Address',
            tel:'test1Tel',
            kl:'test1Kl',
            month:'test1Month',
            summ:200000
        };
            expect(addcredit(newForm)).deep.to.equal({
            name:'test1',
            address:'test1Address',
            tel:'test1Tel',
            kl:'test1Kl',
            month:'test1Month',
            summ:200000,
            kd:1
        });
        expect(addcredit(newForm)).deep.to.equal({
            name:'test1',
            address:'test1Address',
            tel:'test1Tel',
            kl:'test1Kl',
            month:'test1Month',
            summ:200000,
            kd:2
        });
        expect(addcredit(newForm)).deep.to.equal({
            name:'test1',
            address:'test1Address',
            tel:'test1Tel',
            kl:'test1Kl',
            month:'test1Month',
            summ:200000,
            kd:3
        });
    })
})

describe('deblist',function(){
    it('Функция должна возвращать список должников (результаты зависят от функции addcredit)',()=>{
        var debtList = [{name:'test1',address:'test1Address',tel:'test1Tel',kl:'test1Kl',month:'test1Month',summ:200000,kd:1},{name:'test1',address:'test1Address',tel:'test1Tel',kl:'test1Kl',month:'test1Month',summ:200000,kd:2},{name:'test1',address:'test1Address',tel:'test1Tel',kl:'test1Kl',month:'test1Month',summ:200000,kd:3}]
        expect(deblist()).deep.to.equal(debtList);
    })
})

describe('addpayment', function(){
    it('Функция должна вычитать платеж из долга должника',()=>{
        expect(addpayment(1,200)).deep.to.equal({
            name:'test1',
            address:'test1Address',
            tel:'test1Tel',
            kl:'test1Kl',
            month:'test1Month',
            summ:199800,
            kd:1
        });
        expect(addpayment(12,200)).equal(null);
        expect(addpayment(2,300000)).deep.to.equal({
            name:'test1',
            address:'test1Address',
            tel:'test1Tel',
            kl:'test1Kl',
            month:'test1Month',
            summ:0,
            kd:2
        });
    })
})

describe('loginin',function(){
    it('Функция для авторизации пользователя', ()=>{
        expect(loginin("IvIvIv", "890098")).equal(true);
        expect(loginin('QWerty', '890098')).equal(false);
        expect(loginin('IvIvIv', '789513')).equal(false);
    })
})