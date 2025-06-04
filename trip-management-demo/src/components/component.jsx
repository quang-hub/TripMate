import React from "react"

export const Component = () => {
    return (
        <div id="webcrumbs">
            <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
                <div className="max-w-7xl mx-auto">
                    <header className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                                    <span className="material-symbols-outlined text-white text-2xl">
                                        flight_takeoff
                                    </span>
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">TravelPlan</h1>
                                    <p className="text-gray-600">Quản lý lịch trình du lịch nhóm</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 flex items-center gap-2">
                                    <span className="material-symbols-outlined">add</span>
                                    Tạo chuyến đi mới
                                </button>
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors duration-200">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800">Chuyến đi sắp tới</h2>
                                    <details className="relative">
                                        <summary className="cursor-pointer list-none">
                                            <span className="material-symbols-outlined text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                                filter_list
                                            </span>
                                        </summary>
                                        <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-10 w-48">
                                            <div className="space-y-2">
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" className="rounded" />
                                                    <span className="text-sm">Chuyến đi sắp tới</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" className="rounded" />
                                                    <span className="text-sm">Chuyến đi đã hoàn thành</span>
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" className="rounded" />
                                                    <span className="text-sm">Chuyến đi đã hủy</span>
                                                </label>
                                            </div>
                                        </div>
                                    </details>
                                </div>

                                <div className="space-y-4">
                                    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src="https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=80&h=80&fit=crop&crop=center"
                                                    alt="Da Nang"
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                    keywords="da nang, vietnam, travel, beach"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">Du lịch Đà Nẵng</h3>
                                                    <p className="text-gray-600 text-sm">15 - 20 Tháng 12, 2024</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="material-symbols-outlined text-gray-500 text-sm">
                                                            group
                                                        </span>
                                                        <span className="text-sm text-gray-600">8 thành viên</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                                    Đã xác nhận
                                                </span>
                                                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                                                    <span className="material-symbols-outlined text-sm">more_vert</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=80&h=80&fit=crop&crop=center"
                                                    alt="Phu Quoc"
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                    keywords="phu quoc, vietnam, island, beach"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">Phú Quốc - Đảo Ngọc</h3>
                                                    <p className="text-gray-600 text-sm">
                                                        28 Tháng 12 - 3 Tháng 1, 2025
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="material-symbols-outlined text-gray-500 text-sm">
                                                            group
                                                        </span>
                                                        <span className="text-sm text-gray-600">12 thành viên</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                                    Đang lên kế hoạch
                                                </span>
                                                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                                                    <span className="material-symbols-outlined text-sm">more_vert</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src="https://images.unsplash.com/photo-1596436889106-be35e843f974?w=80&h=80&fit=crop&crop=center"
                                                    alt="Sapa"
                                                    className="w-16 h-16 rounded-lg object-cover"
                                                    keywords="sapa, vietnam, mountains, travel"
                                                />
                                                <div>
                                                    <h3 className="font-semibold text-gray-800">Khám phá Sapa</h3>
                                                    <p className="text-gray-600 text-sm">10 - 15 Tháng 2, 2025</p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="material-symbols-outlined text-gray-500 text-sm">
                                                            group
                                                        </span>
                                                        <span className="text-sm text-gray-600">6 thành viên</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                                    Đang thảo luận
                                                </span>
                                                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200">
                                                    <span className="material-symbols-outlined text-sm">more_vert</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                    Lịch trình chi tiết - Du lịch Đà Nẵng
                                </h2>

                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold text-sm">1</span>
                                            </div>
                                            <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">Ngày 1 - 15/12/2024</h3>
                                            <p className="text-gray-600 text-sm mb-3">Bay từ Hà Nội đến Đà Nẵng</p>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="material-symbols-outlined text-xs">schedule</span>
                                                    <span>06:00 - Check-in sân bay Nội Bài</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="material-symbols-outlined text-xs">schedule</span>
                                                    <span>10:30 - Đến sân bay Đà Nẵng</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="material-symbols-outlined text-xs">hotel</span>
                                                    <span>14:00 - Check-in khách sạn</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold text-sm">2</span>
                                            </div>
                                            <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">Ngày 2 - 16/12/2024</h3>
                                            <p className="text-gray-600 text-sm mb-3">Khám phá Bà Nà Hills</p>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="material-symbols-outlined text-xs">schedule</span>
                                                    <span>08:00 - Khởi hành đi Bà Nà Hills</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="material-symbols-outlined text-xs">
                                                        attractions
                                                    </span>
                                                    <span>10:00 - Cầu Vàng & French Village</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="material-symbols-outlined text-xs">
                                                        restaurant
                                                    </span>
                                                    <span>18:00 - Ăn tối tại trung tâm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                                                <span className="text-white font-semibold text-sm">3</span>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">Ngày 3 - 17/12/2024</h3>
                                            <p className="text-gray-600 text-sm mb-3">Hội An cổ kính</p>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="material-symbols-outlined text-xs">schedule</span>
                                                    <span>09:00 - Tham quan phố cổ Hội An</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <span className="material-symbols-outlined text-xs">
                                                        shopping_bag
                                                    </span>
                                                    <span>14:00 - Mua sắm tại chợ đêm</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Thành viên nhóm</h2>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">A</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">Nguyễn Văn An</p>
                                            <p className="text-xs text-gray-600">Trưởng nhóm</p>
                                        </div>
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">B</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">Trần Thị Bình</p>
                                            <p className="text-xs text-gray-600">Thành viên</p>
                                        </div>
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">C</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">Lê Minh Châu</p>
                                            <p className="text-xs text-gray-600">Thành viên</p>
                                        </div>
                                        <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">D</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-800">Phạm Văn Dũng</p>
                                            <p className="text-xs text-gray-600">Thành viên</p>
                                        </div>
                                        <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                                    </div>
                                </div>
                                <button className="w-full mt-4 py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-300 hover:text-primary-600 transition-colors duration-200 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">person_add</span>
                                    Thêm thành viên
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Chi phí dự kiến</h2>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Vé máy bay</span>
                                        <span className="font-semibold">12,000,000 ₫</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Khách sạn</span>
                                        <span className="font-semibold">8,000,000 ₫</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Ăn uống</span>
                                        <span className="font-semibold">6,000,000 ₫</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Tham quan</span>
                                        <span className="font-semibold">4,000,000 ₫</span>
                                    </div>
                                    <div className="border-t pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-semibold text-gray-800">Tổng cộng</span>
                                            <span className="font-bold text-lg text-primary-600">30,000,000 ₫</span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">~3,750,000 ₫ / người</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-4">Thảo luận nhóm</h2>
                                <div className="space-y-4 max-h-64 overflow-y-auto">
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-medium">A</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gray-100 rounded-lg p-3">
                                                <p className="text-sm">
                                                    Mọi người đã book vé máy bay chưa? Tôi thấy giá đang tăng đấy!
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">2 giờ trước</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-medium">B</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gray-100 rounded-lg p-3">
                                                <p className="text-sm">Tôi đã book rồi! Các bạn nên nhanh lên nhé.</p>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">1 giờ trước</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-sm font-medium">C</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="bg-gray-100 rounded-lg p-3">
                                                <p className="text-sm">
                                                    Khách sạn ở Hội An có gần phố cổ không các bạn?
                                                </p>
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">30 phút trước</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Nhập tin nhắn..."
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    />
                                    <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200">
                                        <span className="material-symbols-outlined">send</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Next: "Add weather forecast widget, expense tracking with payment status, and interactive map view" */}
            </div>
        </div>
    )
}
export default Component;
