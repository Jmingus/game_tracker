json.array!(@testers) do |tester|
  json.extract! tester, :id
  json.url tester_url(tester, format: :json)
end
