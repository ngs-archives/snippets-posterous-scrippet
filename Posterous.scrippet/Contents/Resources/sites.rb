$:[0,0] = './lib'
require 'get_json'

if ENV["SNIPPET_INDEX"].to_i() == 0

  begin

    ids = []
    names = []
    
    puts 'Getting sites...'

    get_sites.each do |site|
      puts "Found site:##{site['id']} #{site['name']}"
      ids.push( site['id'] )
      names.push( site['name'] )
    end

    ENV["POSTEROUS_SITE_IDS"] = ids.join("\n")
    ENV["POSTEROUS_SITE_NAMES"] = names.join("\n")
    
  rescue Exception=>e
    ENV["POSTEROUS_ERROR"] = e.message.to_s()
  ensure
  end

end
