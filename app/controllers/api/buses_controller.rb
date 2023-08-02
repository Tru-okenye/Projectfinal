class Api::BusesController < ApplicationController
  before_action :set_bus, only: [:show, :update, :destroy]

  def index
    from = params[:from]
    to = params[:to]
    date = params[:date]

    if from && to && date
      buses = Bus.where(from: from, to: to, date: date)
    else
      buses = Bus.all
    end

    render json: buses
  end

  def create
 
    bus = Bus.new(bus_params)

   # Convert the time to HH:mm format before saving
    time = params[:bus][:time]
 time_obj = Time.zone.parse(time) # Parse the time string to a Time object
 formatted_time = time_obj.strftime('%H:%M')
   # Merge the formatted time into the bus_params
  bus_params_with_time = bus_params.merge(time: formatted_time)

  
    bus = Bus.new(bus_params_with_time)

    if bus.save
      render json: bus, status: :created
    else
      render json: { error: bus.errors.full_messages }, status: :unprocessable_entity
    end
end


  def show
    render json: @bus
  end

  def update
    if @bus.update(bus_params)
      render json: @bus
    else
      render json: { error: @bus.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @bus.destroy
    render json: { message: 'Bus deleted successfully' }
  end

  private

  def set_bus
    @bus = Bus.find(params[:id])
  end

  def bus_params
    params.require(:bus).permit(:from, :to, :amount, :date, :time, :seats, :driver_name, :number_plate, :driver_phone_number)
  end
end
