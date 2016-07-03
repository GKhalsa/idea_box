require "rails_helper"

feature "user can add idea", :js => true do
  scenario "the page displays the idea" do
    visit "/"

    expect(page).to_not have_content("Cool Title")
    expect(page).to_not have_content("Cool Body")
    expect(page).to have_selector('li', count: 0)

    fill_in 'Title', with: "Cool Title"
    fill_in 'Body', with: "Cool Body"
    click_on('Save')
    wait_for_ajax

    expect(page).to have_content('Cool Title')
    expect(page).to have_content('Cool Body')
    expect(page).to have_selector('li', count: 1)
  end
end
