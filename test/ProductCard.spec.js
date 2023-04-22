import { mount } from '@vue/test-utils'
import ProductCard from '@/components/ProductCard.vue'

describe('ProductCard', () => {


  //ok
  test('should require title and src props', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { })
    mount(ProductCard)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "title"'))
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "src"'))
    consoleSpy.mockRestore()
  })



  //ok
  test('should render slot content in the footer', () => {
    const wrapper = mount(ProductCard, {
      props: {
        title: 'Test Product',
        src: '/path/to/image.jpg',
      },
      slots: {
        default: '<span>Test slot content</span>',
      },
    })
    expect(wrapper.find('.card-footer-item').text()).toBe('Test slot content')
  })



  test('should have class "column"', () => {
    const wrapper = mount(ProductCard, {
      props: {
        title: 'Test Product',
        src: '/path/to/image.jpg',
      },
    })
    expect(wrapper.classes()).toContain('column')
  })




  test('should have a footer with a card-footer-item', () => {
    const wrapper = mount(ProductCard, {
      props: {
        title: 'Test Product',
        src: '/path/to/image.jpg',
      },
      slots: {
        default: '<span>Test slot content</span>',
      },
    })
    expect(wrapper.find('.card-footer .card-footer-item').exists()).toBe(true)
  })

  test('should require title and src props and show errors in console', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { })
    mount(ProductCard)
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "title"'))
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "src"'))
    consoleSpy.mockRestore()
  })



})
