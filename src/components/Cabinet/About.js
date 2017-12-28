import React, { Component } from 'react'
import Paper from 'material-ui/Paper';
import './styles.css'
const style = {

    width: 700,
    margin: 'auto',
    textAlign: 'center',
    display: 'inline-block',
    fontSize : '14px',
    lineHeight: '28px'
  };
export default class About extends Component {

    render() {
        return  <div className='cabinet-wrap'>
                    <Paper style={style} zDepth={1} >
            
                        <h2>О компании</h2>
                        <p> Мы рады приветствовать Вас на сайте юридической компании «АТИС».Мы решим любые з­­­­адачи.</p>
                        <strong>Земельное право – это одна из главных специализаций компании «АТИС». Наши юристы по земельным вопросам готовы провести консультирование. Имеем большой опыт работы в отрасли и широкую правоприменительную практику, гарантируем своим клиентам высокое качество оказания услуг, полную конфиденциальность и неукоснительное соблюдение юридической этики. </strong>Обращаясь к нам за помощью юриста по земельным вопросам, вы можете быть уверены в том, что получите четкие понятные инструкции по решению вопроса именно в вашу пользу!   
   Юридические вопросы — не тот случай, когда можно пытаться разобраться самостоятельно. Уйдет драгоценное время, и многие вопросы решить будет уже нереально. Сориентироваться в море правовых актов, их толкований и практике применения под силу только специалисту. Поэтому мы всегда рекомендуем как можно раньше обратиться за профессиональной юридической консультацией. Консультация юристов компании «АТИС» абсолютно бесплатна и ни к чему вас не обязывает.
       Предоставление бесплатных консультаций — стандартная практика юридических компаний. Обратившись к нам за юридической консультацией, вы сможете узнать правильный вектор развития стратегии отстаивания своих прав, а также оценить профессиональный уровень консультирующего вас юриста, и решить, стоит ли продолжать сотрудничать с нами. В зависимости от сложности правового вопроса может потребоваться разный объем юридической помощи. 
       Стоит отметить, что в большей части жизненных ситуаций бывает достаточно профессиональной юридической консультации, оказанной нашими специалистами.
                    </Paper>
                </div>
    }
}