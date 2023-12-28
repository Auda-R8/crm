/* --- ___ --- ___ --- ___ --- ___ --- ___ *
*           Exported class Mask            *
*                                          *
*  Author:                        Auda_R8  *
*  Version:                         1.0.0  *
*  Docs:             www.cbr-xml-daily.ru  *
*  Git:     github.com/Auda-R8/MaskJS.git  *
*  Copyright:                   © Auda_R8  *
* --- ___ --- ___ --- ___ --- ___ --- ___ */

export class Mask {

    /**
     * @private
     * @type {HTMLElement|null} - HTML-элемент, к которому применяется маска.
     */
    static #element = null

    /**
     * @private
     * @type {string|null} - Тип маски, который следует применить.
     */
    static #maskType = null

    /**
     * @private
     * @type {Object} - Типы масок, каждый входящий тип обрабатывается
     * соответствующим методом
     */
    static #maskTypes = {
        phoneDefault: Mask.#phoneDefault, // +7 (***) ***-**-**
        phone
    }

    /**
     * Применяет маску к элементу.
     * @param {HTMLElement} element - HTML-элемент, к которому применяется маска.
     * @param {string} maskType - Тип маски, который следует применить.
     *   Возможные значения: 'moneyDot', 'dateDot', 'moneySpace', и т.д.
     * @returns {void}
     */
    static useMask(element, maskType) {
        Mask.#maskTypes[maskType](element)
    }
}