window.onload = () => {
	const FORM_WRAPPER = document.querySelector(`.column_type_input`);
	const ratingArray = [];
	let countedRating = 20;


	const renderSearch = (allItemsData) => {
		PageEnum.SiteWrapper.SEARCH.innerHTML = ``;

		const searchComponent = new Search();

		PageEnum.SiteWrapper.SEARCH.appendChild(searchComponent.render());

		searchComponent.onChange = (value) => {
			const filteredItems = allItemsData.filter((currentItem) => currentItem._names.includes(value));
			PageEnum.SiteWrapper.rating.innerHTML = ``;
			value === `` ? ratingRender(countedRating, allItemsData) : ratingUpdate(filteredItems);
		};
	};

	const ratingRender = (ratingAmount, ratingArray) => {
		for (let i = 0; i < ratingAmount; i++) {
			ratingArray[i] = new PersonRating(returnRandomData());
		}
		ratingUpdate(ratingArray);
	};

	const ratingUpdate = (ratingArray) => {
		ratingArray.forEach((item) => {
			PageEnum.SiteWrapper.rating.appendChild(item.render());
		});
		if (ratingArray.length === 0) {
			PageEnum.SiteWrapper.rating.innerHTML = `Rating list is empty`
		}
	};

	const renderForm = () => {
		const formComponent = new Form();
		FORM_WRAPPER.appendChild(formComponent.render());

		formComponent.onSubmit = (evt) => {
			evt.preventDefault();
			const name = document.querySelector(`input[name=name]`).value;
			const cat = document.querySelector(`input[name=cat]`).value;
			const rest = document.querySelector(`input[name=rest]`).value;
			const money = document.querySelector(`input[name=money]`).value;
/*
* При Submit формы в script.js (со стр.41) желательно проверить ввел ли пользоваетль элемент формы (Имя) name - смысла посылать на сервер пустое имя
скорее все нет никакого.
Селекторы выбирают всегда 1 элемент radio группы
Например:
	const cat = document.querySelector(`input[name=cat]`).value;	// cat будет всегда yes вне зависимости от выбора пользователя
Попробуйте заменить на:
	const cat = document.querySelector(`input[name=cat][checked]`).value;
либо воспользуйтесь методом querySelectorAll для выбора всех элементов radio группы с дальнейшим анализом этих элементов.

*/
			const Man = new Person(name);
			if (cat === 'yes') {
				Man.hasCat();
			}
			if (rest === 'yes') {
				Man.hasRest();
			}
			if (money === 'yes') {
				Man.hasMoney();
			}
/*
* Так же не забудьте передать параметры формы в метод Man.isSunny(attr)
Например:
	Man.isSunny({name, cat, rest, money})
 после того как сервер будет подключен он конечно будет ожидать эти данные из формы.
 В зависимости от ответа сервера доработайте логику обработки полученного рейтинга.
*/
			Man.isSunny()
				.then((happiness) => {
					Man._valueElement.innerHTML = name;
					if (happiness === 4) {
						Man._iconElement.innerHTML = 'рџ†';
					} else if (happiness === 3 || happiness === 2) {
						Man._iconElement.innerHTML = 'рџђ';
					} else {
						Man._iconElement.innerHTML = 'в№пёЏ';
					}
				});
		}
	};

	renderForm();
	renderSearch(ratingArray);
	ratingRender(countedRating, ratingArray);
};
